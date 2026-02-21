package com.project.pujroute.controller;

import com.project.pujroute.model.PujRoute;
import com.project.pujroute.service.PujService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pujs")
@CrossOrigin(origins = "*")
public class PujController {

    private final PujService pujService;

    public PujController(PujService pujService) {
        this.pujService = pujService;
    }

    // GET /api/pujs?search=...
    @GetMapping
    public Map<String, Object> getAll(@RequestParam(required = false) String search) {
        List<PujRoute> list = pujService.getAll(search);
        Map<String, Object> res = new HashMap<>();
        res.put("pujs", list);
        return res;
    }

    // GET /api/pujs/{code}
    @GetMapping("/{code}")
    public Map<String, Object> getOne(@PathVariable String code) {
        PujRoute route = pujService.getByCode(code);
        Map<String, Object> res = new HashMap<>();
        if (route == null) {
            res.put("error", "PUJ not found");
        } else {
            res.put("puj", route);
        }
        return res;
    }
}