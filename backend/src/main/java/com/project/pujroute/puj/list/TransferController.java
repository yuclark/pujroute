package com.project.pujroute.puj.details;

import com.project.pujroute.puj.shared.TransferService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transfer")
public class TransferController {

    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @GetMapping
    public Map<String, Object> findTransfer(
            @RequestParam String start,
            @RequestParam String destination) {
        List<Map<String, Object>> paths = transferService.findRoutesWithOptionalTransfer(start, destination);

        Map<String, Object> res = new HashMap<>();
        res.put("paths", paths);
        return res;
    }
}