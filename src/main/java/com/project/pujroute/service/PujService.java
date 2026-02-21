package com.project.pujroute.service;

import com.project.pujroute.data.MockPujData;
import com.project.pujroute.model.PujRoute;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PujService {

    public List<PujRoute> getAll(String search) {
        if (search == null || search.isBlank()) {
            return MockPujData.PUJS;
        }

        String q = search.toLowerCase();

        return MockPujData.PUJS.stream()
                .filter(p ->
                        p.getCode().toLowerCase().contains(q) ||
                                p.getOrigin().toLowerCase().contains(q) ||
                                p.getDestination().toLowerCase().contains(q)
                )
                .toList();
    }

    public PujRoute getByCode(String code) {
        return MockPujData.getByCode(code);
    }
}