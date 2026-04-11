package com.project.pujroute.puj.shared;

import java.util.ArrayList;
import java.util.List;

public class MockPujData {

    public static final List<PujRoute> PUJS = new ArrayList<>();

    static {
        PUJS.add(new PujRoute("01C", "Private", "Colon", "Urgello, Pier"));
        PUJS.add(new PujRoute("01K", "Urgello", "Parkmall", "Colon, SM & NBT"));
        PUJS.add(new PujRoute("02B", "South Bus Terminal", "Colon", "Pier"));
        PUJS.add(new PujRoute("03A", "Mabolo", "Carbon", "Panagdait & Manalili"));
        PUJS.add(new PujRoute("03B", "Mabolo", "Carbon", ""));
        PUJS.add(new PujRoute("03L", "Mabolo", "Carbon", ""));
        PUJS.add(new PujRoute("04B", "Lahug, Plaza Housing", "Carbon", ""));
        PUJS.add(new PujRoute("04H", "Lahug, Plaza Housing", "Carbon", "Capitol & Jones"));
        PUJS.add(new PujRoute("04L", "Lahug, Plaza Housing", "Ayala", "SM"));
        PUJS.add(new PujRoute("06B", "Guadalupe", "Carbon", "Jones"));
        PUJS.add(new PujRoute("06H", "Guadalupe", "SM", ""));
        PUJS.add(new PujRoute("08F", "Alumnos", "SM", ""));
        PUJS.add(new PujRoute("08G", "Alumnos", "Colon", ""));
    }

    public static PujRoute getByCode(String code) {
        return PUJS.stream()
                .filter(p -> p.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);
    }
}