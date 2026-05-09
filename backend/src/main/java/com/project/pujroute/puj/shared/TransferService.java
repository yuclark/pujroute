package com.project.pujroute.puj.shared;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransferService {

    // Max number of legs (routes) in a trip. 3 legs = up to 2 transfers.
    private static final int MAX_LEGS = 5;

    // ─────────────────────────────────────────────
    // PUBLIC ENTRY POINT
    // ─────────────────────────────────────────────

    public List<Map<String, Object>> findRoutesWithOptionalTransfer(String start, String destination) {
        List<PujRoute> allRoutes = MockPujData.PUJS;
        String startNorm = start.trim().toLowerCase();
        String destNorm = destination.trim().toLowerCase();

        // 1) Direct (1-leg)
        List<Map<String, Object>> direct = findDirectRoutes(allRoutes, startNorm, destNorm);
        if (!direct.isEmpty()) {
            return direct;
        }

        // 2) Multi-leg via BFS (2 to MAX_LEGS legs)
        return findMultiLegRoutes(allRoutes, startNorm, destNorm);
    }

    // ─────────────────────────────────────────────
    // STEP 1: DIRECT ROUTES
    // ─────────────────────────────────────────────

    private List<Map<String, Object>> findDirectRoutes(
            List<PujRoute> allRoutes, String startNorm, String destNorm) {

        List<Map<String, Object>> results = new ArrayList<>();
        for (PujRoute route : allRoutes) {
            DirectionMatch match = findDirectionForTwoStops(route, startNorm, destNorm);
            if (match != null) {
                Map<String, Object> path = new HashMap<>();
                path.put("type", "direct");
                path.put("totalLegs", 1);
                path.put("legs", List.of(
                        buildLeg(
                                route,
                                match.directionName,
                                getStop(route, match.indexStart),
                                getStop(route, match.indexDest))));
                results.add(path);
            }
        }
        return results;
    }

    // ─────────────────────────────────────────────
    // STEP 2: MULTI-LEG BFS (UP TO MAX_LEGS)
    // ─────────────────────────────────────────────

    private List<Map<String, Object>> findMultiLegRoutes(
            List<PujRoute> allRoutes, String startNorm, String destNorm) {

        Map<String, PujRoute> routeMap = new HashMap<>();
        for (PujRoute r : allRoutes) {
            routeMap.put(r.getCode(), r);
        }

        // Routes that contain the start stop
        List<String> startRouteCodes = allRoutes.stream()
                .filter(r -> containsStop(r, startNorm))
                .map(PujRoute::getCode)
                .collect(Collectors.toList());

        // Routes that contain the destination stop
        Set<String> destRouteCodes = allRoutes.stream()
                .filter(r -> containsStop(r, destNorm))
                .map(PujRoute::getCode)
                .collect(Collectors.toSet());

        if (startRouteCodes.isEmpty() || destRouteCodes.isEmpty()) {
            return Collections.emptyList();
        }

        // Build route graph: routeCode -> neighbors
        Map<String, Set<String>> graph = buildRouteGraph(allRoutes);

        // BFS by layers, so the first found path(s) are the shortest (fewest legs)
        Queue<List<String>> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        for (String code : startRouteCodes) {
            queue.add(List.of(code));
            visited.add(code);
        }

        List<List<String>> foundPaths = new ArrayList<>();
        int foundLegCount = -1; // keep shortest leg count we find

        while (!queue.isEmpty()) {
            List<String> currentPath = queue.poll();
            int currentLegCount = currentPath.size();
            String lastCode = currentPath.get(currentLegCount - 1);

            // If we already found paths with fewer legs, stop exploring longer paths
            if (foundLegCount != -1 && currentLegCount > foundLegCount) {
                continue;
            }

            // Check if this path's last route contains destination
            PujRoute lastRoute = routeMap.get(lastCode);
            if (lastRoute != null && containsStop(lastRoute, destNorm) && currentLegCount > 1) {
                foundPaths.add(currentPath);
                foundLegCount = currentLegCount;
                // Do NOT return immediately; finish this BFS layer to collect
                // all paths with the same leg count.
                continue;
            }

            if (currentLegCount >= MAX_LEGS) {
                continue;
            }

            // Expand neighbors
            Set<String> neighbors = graph.getOrDefault(lastCode, Collections.emptySet());
            for (String neighbor : neighbors) {
                if (!currentPath.contains(neighbor)) {
                    List<String> newPath = new ArrayList<>(currentPath);
                    newPath.add(neighbor);
                    queue.add(newPath);
                }
            }
        }

        if (foundPaths.isEmpty()) {
            return Collections.emptyList();
        }

        List<Map<String, Object>> results = new ArrayList<>();
        for (List<String> path : foundPaths) {
            Map<String, Object> result = buildMultiLegResult(path, routeMap, startNorm, destNorm);
            if (result != null) {
                results.add(result);
            }
        }

        return results;
    }

    // ─────────────────────────────────────────────
    // BUILD ROUTE GRAPH
    // ─────────────────────────────────────────────

    private Map<String, Set<String>> buildRouteGraph(List<PujRoute> allRoutes) {
        Map<String, Set<String>> graph = new HashMap<>();
        for (PujRoute r : allRoutes) {
            graph.put(r.getCode(), new HashSet<>());
        }
        for (int i = 0; i < allRoutes.size(); i++) {
            for (int j = i + 1; j < allRoutes.size(); j++) {
                PujRoute a = allRoutes.get(i);
                PujRoute b = allRoutes.get(j);
                if (!getSharedStops(a, b).isEmpty()) {
                    graph.get(a.getCode()).add(b.getCode());
                    graph.get(b.getCode()).add(a.getCode());
                }
            }
        }
        return graph;
    }

    // ─────────────────────────────────────────────
    // BUILD STRUCTURED RESULT FROM A BFS PATH
    // ─────────────────────────────────────────────

    private Map<String, Object> buildMultiLegResult(
            List<String> path,
            Map<String, PujRoute> routeMap,
            String startNorm,
            String destNorm) {

        List<Map<String, Object>> legs = new ArrayList<>();
        String currentFrom = startNorm;

        for (int i = 0; i < path.size(); i++) {
            PujRoute route = routeMap.get(path.get(i));
            if (route == null) {
                return null;
            }

            boolean isLastLeg = (i == path.size() - 1);
            String currentTo;

            if (isLastLeg) {
                currentTo = destNorm;
            } else {
                PujRoute nextRoute = routeMap.get(path.get(i + 1));
                if (nextRoute == null) {
                    return null;
                }
                List<String> shared = getSharedStops(route, nextRoute);
                if (shared.isEmpty()) {
                    return null;
                }

                String transferStop = pickBestTransferStop(route, currentFrom, shared);
                if (transferStop == null) {
                    return null;
                }
                currentTo = transferStop.toLowerCase();
            }

            DirectionMatch match = findDirectionForTwoStops(route, currentFrom, currentTo);
            if (match == null) {
                return null;
            }

            String fromStop = getStop(route, match.indexStart);
            String toStop = getStop(route, match.indexDest);

            // DEBUG LOG: see what each leg thinks
            System.out.println("LEG " + (i + 1) + " route " + route.getCode());
            System.out.println("  currentFrom (norm): " + currentFrom);
            System.out.println("  currentTo   (norm): " + currentTo);
            System.out.println("  fromStop: " + fromStop);
            System.out.println("  toStop:   " + toStop);
            System.out.println("  direction: " + match.directionName);

            legs.add(buildLeg(route, match.directionName, fromStop, toStop));

            currentFrom = currentTo;
        }

        String type = switch (legs.size()) {
            case 1 -> "direct";
            case 2 -> "transfer";
            case 3 -> "triple";
            default -> legs.size() + "-leg";
        };

        Map<String, Object> result = new HashMap<>();
        result.put("type", type);
        result.put("totalLegs", legs.size());
        result.put("legs", legs);
        return result;
    }

    // ─────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────

    private Map<String, Object> buildLeg(PujRoute route, String direction,
            String fromStop, String toStop) {
        Map<String, Object> leg = new HashMap<>();
        leg.put("routeCode", route.getCode());
        leg.put("route", route);
        leg.put("direction", direction);
        leg.put("fromStop", fromStop);
        leg.put("toStop", toStop);
        return leg;
    }

    private String pickBestTransferStop(PujRoute route, String fromNorm, List<String> sharedStops) {
        int fromIndex = indexOfStop(route.getStops(), fromNorm);
        if (fromIndex == -1) {
            return sharedStops.get(0);
        }

        // Prefer shared stops after the currentFrom index
        for (String stop : sharedStops) {
            int idx = indexOfStop(route.getStops(), stop.toLowerCase());
            if (idx > fromIndex) {
                return stop;
            }
        }

        // Fallback to any shared stop before currentFrom
        for (String stop : sharedStops) {
            int idx = indexOfStop(route.getStops(), stop.toLowerCase());
            if (idx < fromIndex) {
                return stop;
            }
        }

        return sharedStops.get(0);
    }

    private String getStop(PujRoute route, int index) {
        List<String> stops = route.getStops();
        if (index < 0 || index >= stops.size()) {
            return "";
        }
        return stops.get(index);
    }

    // Exact stop names (case-insensitive), no substring
    private boolean containsStop(PujRoute route, String stopNorm) {
        return route.getStops().stream()
                .anyMatch(s -> s.equalsIgnoreCase(stopNorm));
    }

    private List<String> getSharedStops(PujRoute routeA, PujRoute routeB) {
        Set<String> stopsB = routeB.getStops().stream()
                .map(String::toLowerCase)
                .collect(Collectors.toSet());
        List<String> shared = new ArrayList<>();
        for (String stop : routeA.getStops()) {
            if (stopsB.contains(stop.toLowerCase())) {
                shared.add(stop);
            }
        }
        return shared;
    }

    // FIXED: start index is always the actual start stop, even for backward
    private DirectionMatch findDirectionForTwoStops(PujRoute route, String startNorm, String destNorm) {
        List<String> stops = route.getStops();
        int fStart = indexOfStop(stops, startNorm);
        int fDest = indexOfStop(stops, destNorm);

        if (fStart == -1 || fDest == -1) {
            return null;
        }

        if (fStart < fDest) {
            // Travel in the forward order of the stops list
            return new DirectionMatch("forward", fStart, fDest);
        } else if (fStart > fDest) {
            // Travel in the backward order, but keep start at fStart and dest at fDest
            return new DirectionMatch("backward", fStart, fDest);
        } else {
            // Same stop; no real movement
            return null;
        }
    }

    // Exact match search by name (case-insensitive)
    private int indexOfStop(List<String> stops, String stopNorm) {
        for (int i = 0; i < stops.size(); i++) {
            if (stops.get(i).equalsIgnoreCase(stopNorm)) {
                return i;
            }
        }
        return -1;
    }

    private static class DirectionMatch {
        String directionName;
        int indexStart;
        int indexDest;

        DirectionMatch(String directionName, int indexStart, int indexDest) {
            this.directionName = directionName;
            this.indexStart = indexStart;
            this.indexDest = indexDest;
        }
    }
}