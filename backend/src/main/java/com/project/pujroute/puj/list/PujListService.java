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
}