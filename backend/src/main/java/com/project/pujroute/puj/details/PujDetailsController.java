package com.project.pujroute.puj.details;

import com.project.pujroute.puj.shared.PujRoute;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/pujs")
public class PujDetailsController {

    private final PujDetailsService pujDetailsService;

    public PujDetailsController(PujDetailsService pujDetailsService) {
        this.pujDetailsService = pujDetailsService;
    }

    @GetMapping("/{code}")
    public Map<String, Object> getOne(@PathVariable String code) {
        PujRoute route = pujDetailsService.getByCode(code);
        Map<String, Object> res = new HashMap<>();
        if (route == null) {
            res.put("error", "PUJ not found");
        } else {
            res.put("puj", route);
        }
        return res;
    }
}