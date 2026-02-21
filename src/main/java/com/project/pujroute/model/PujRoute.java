package com.project.pujroute.model;

public class PujRoute {
    private String code;
    private String origin;
    private String destination;
    private String otherRoutes;

    public PujRoute(String code, String origin, String destination, String otherRoutes) {
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.otherRoutes = otherRoutes;
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

    public String getOtherRoutes() {
        return otherRoutes;
    }
}