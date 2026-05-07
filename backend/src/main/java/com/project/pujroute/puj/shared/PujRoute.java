package com.project.pujroute.puj.shared;

import java.util.ArrayList;
import java.util.List;

public class PujRoute {

    private String code;
    private String origin;
    private String destination;
    private String via;
    private List<String> stops;
    private Double baseFare;
    private String routeOverview;

    public PujRoute(String code, String origin, String destination, String via,
            List<String> stops, Double baseFare, String routeOverview) {
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.via = via;
        this.stops = stops;
        this.baseFare = baseFare;
        this.routeOverview = routeOverview;
    }

    public String getCode() {
        return code;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDestination() {
        return destination;
    }

    public String getVia() {
        return via;
    }

    public List<String> getStops() {
        return stops;
    }

    public Double getBaseFare() {
        return baseFare;
    }

    public String getRouteOverview() {
        return routeOverview;
    }
}