package com.project.pujroute.puj.shared;

public class PujRoute {

    private String code;
    private String origin;
    private String destination;
    private String via;

    public PujRoute(String code, String origin, String destination, String via) {
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.via = via;
    }

    public String getCode() { return code; }
    public String getOrigin() { return origin; }
    public String getDestination() { return destination; }
    public String getVia() { return via; }
}