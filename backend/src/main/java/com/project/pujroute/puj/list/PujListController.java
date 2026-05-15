package com.project.pujroute.puj.list;

import com.project.pujroute.puj.shared.PujRoute;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pujs")
public class PujListController {

    private final PujListService pujListService;

    public PujListController(PujListService pujListService) {
        this.pujListService = pujListService;
    }

    @GetMapping
    public Map<String, Object> getAll(@RequestParam(required = false) String search) {
        List<PujRoute> list = pujListService.getAll(search);
        Map<String, Object> res = new HashMap<>();
        res.put("pujs", list);
        return res;
    }

    @GetMapping("/connect")
    public Map<String, Object> connect(
            @RequestParam String start,
            @RequestParam String destination) {
        List<PujRoute> routes = pujListService.findRoutesConnecting(start, destination);
        Map<String, Object> res = new HashMap<>();
        res.put("routes", routes);
        return res;
    }
}