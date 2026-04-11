package com.project.pujroute.puj.details;

import com.project.pujroute.puj.shared.MockPujData;
import com.project.pujroute.puj.shared.PujRoute;
import org.springframework.stereotype.Service;

@Service
class PujDetailsService {

    PujRoute getByCode(String code) {
        return MockPujData.getByCode(code);
    }
}