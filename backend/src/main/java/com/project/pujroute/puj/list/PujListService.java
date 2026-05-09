package com.project.pujroute.puj.list;

import com.project.pujroute.puj.shared.MockPujData;
import com.project.pujroute.puj.shared.PujRoute;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class PujListService {

    List<PujRoute> getAll(String search) {
        if (search == null || search.isBlank()) {
            return MockPujData.PUJS;
        }
        String q = search.toLowerCase();
        return MockPujData.PUJS.stream()
                .filter(p -> p.getCode().toLowerCase().contains(q) ||
                        p.getOrigin().toLowerCase().contains(q) ||
                        p.getDestination().toLowerCase().contains(q) ||
                        (p.getVia() != null && p.getVia().toLowerCase().contains(q)) ||
                        (p.getStops() != null && p.getStops().stream()
                                .anyMatch(stop -> stop.toLowerCase().contains(q))))
                .toList();
    }

    // ✅ NEW — bidirectional stop-to-stop search
    List<PujRoute> findRoutesConnecting(String start, String destination) {
        String startNorm = start.toLowerCase();
        String destNorm = destination.toLowerCase();

        return MockPujData.PUJS.stream()
                .filter(route -> {
                    int indexStart = indexOfContains(route.getStops(), startNorm);
                    int indexDest = indexOfContains(route.getStops(), destNorm);
                    // both stops must exist, and they must be different stops
                    return indexStart != -1 && indexDest != -1 && indexStart != indexDest;
                })
                .toList();
    }

    private int indexOfContains(List<String> stops, String needle) {
        for (int i = 0; i < stops.size(); i++) {
            if (stops.get(i).toLowerCase().contains(needle)) {
                return i;
            }
        }
        return -1;
    }
}