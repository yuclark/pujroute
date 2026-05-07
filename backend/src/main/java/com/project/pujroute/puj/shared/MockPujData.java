package com.project.pujroute.puj.shared;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MockPujData {

    public static final List<PujRoute> PUJS = new ArrayList<>();

    static {
        PUJS.add(new PujRoute("01C", "USC South Campus", "Pier 3",
                "Leon Kilat, Colon, General Maxilom",
                Arrays.asList(
                        "USC South Campus", "J Alcantara", "Leon Kilat St",
                        "Metro Colon", "Colonnade Supermarket", "Gaisano Main",
                        "University of Visayas", "Colon Obelisk", "Mabini Street",
                        "Zulueta Street", "MJ Cuenca Ave", "Tiburcio",
                        "Padilla Street", "B Benedicto Street",
                        "General Maxilom Ave Ext", "Pier 4", "Pier 3"),
                13.0,
                "Route from USC South Campus through downtown Colon commercial district to Pier 3. Passes major landmarks including Gaisano Main, University of Visayas, and the Colon Obelisk. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("01K", "V Urgello Street", "Parkmall",
                "Colon, SM City Cebu, North Bus Terminal",
                Arrays.asList(
                        "V Urgello Street", "Sacred Heart Hospital",
                        "Southwestern University", "Elizabeth Mall (Emall)",
                        "Leon Kilat Street", "Colon", "Metro Gaisano",
                        "Colonnade Supermarket", "University of Visayas",
                        "Gaisano Main", "Brgy. Parian", "Zulueta Street",
                        "MJ Cuenca Ave", "National Statistics Office (NSO)",
                        "General Maxilom Ave", "A Soriano Ave", "SM City Cebu",
                        "North Bus Terminal", "Cebu Doctors University",
                        "CICC", "Parkmall"),
                13.0,
                "Long route from Urgello through downtown Colon to major northern destinations. Passes key hospitals, universities, and shopping centers including SM City Cebu and Parkmall. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("02B", "Cebu City Medical Center", "Pier 3",
                "Elizabeth Mall, Colon, Pier 1",
                Arrays.asList(
                        "Cebu City Medical Center", "Cebu South Bus Terminal (CSBT)",
                        "Elizabeth Mall (Emall)", "Leon Kilat Street",
                        "Metro Colon", "Colonnade Supermarket", "Gaisano Main",
                        "University of Visayas", "P Burgos Street",
                        "Legazpi Exit", "Pier 1", "Pier 2", "Pier 3"),
                13.0,
                "Essential route from South Bus Terminal through downtown Colon to the port area. Serves intercity travelers, hospital visitors, and port-bound commuters. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("03A", "F Cabahug Street", "Carbon Public Market",
                "Hipodromo, Museo Sugbo, Jakosalem",
                Arrays.asList(
                        "F Cabahug Street", "Sykes Asia", "Citi Park",
                        "Sorroso International Hotel", "Castle Peak Hotel",
                        "Pope John Paul II Ave", "PLDT", "Camelita Monastery",
                        "St Joseph Parish", "The Persimmon", "Hipodromo",
                        "Carreta Cemetery", "Imus Ave", "Museo Sugbo",
                        "CPILS", "Cebu Technological University",
                        "Vicente Gullas Street", "Dionisio Jakosalem Street",
                        "Legaspi Street", "Progreso Street", "Carbon Public Market"),
                13.0,
                "Residential to market route passing through Mabolo's business corridor and heritage landmarks. Stops at Museo Sugbo (Cebu provincial museum) and Cebu Technological University. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("03B", "Sindulan Street", "Metro Colon",
                "Fuente Osmeña, Mango Square, Abellana",
                Arrays.asList(
                        "Sindulan Street", "St Joseph Parish", "The Persimmon",
                        "Hipodromo", "Carreta Cemetery", "USC North Campus",
                        "Fooda Saversmart", "Horizons 101", "Mango Square Mall",
                        "Fuente Osmeña Circle", "Crown Regency Suites",
                        "Abellana Sports Complex", "Social Security System (SSS)",
                        "GV Tower Hotel", "Metro Colon"),
                13.0,
                "Alternative Mabolo route through Fuente Osmeña and Mango Avenue corridor. Passes USC North Campus, major residential towers, and Abellana Sports Complex. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("12G", "Punta Princesa", "SM City Cebu",
                "Taboan, Jakosalem, Pier 1",
                Arrays.asList(
                        "Punta Princesa", "Punta Princesa Elementary School",
                        "Miller Hospital", "Cebu Institute of Technology University (CITU)",
                        "Carlock Street", "B Aranas Street", "Taboan Public Market",
                        "Lakandula Street", "Spolarium Street",
                        "University of San Jose Recoletos", "Dionisio Jakosalem Street",
                        "Cebu City Hall", "La Nueva", "Legazpi Exit",
                        "Pier 1", "Pier 2", "Pier 3", "Pier 4", "Pier 5",
                        "SM City Cebu"),
                13.0,
                "Route from Punta Princesa through the city hall corridor and port area to SM City Cebu. Passes Taboan Public Market, University of San Jose Recoletos, and all major piers. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("10H", "Bulacao", "F Cabahug Street",
                "Pardo, CSBT, General Maxilom",
                Arrays.asList(
                        "Bulacao", "Pardo", "University of San Jose Recoletos",
                        "Shopwise", "Mambaling Flyover",
                        "Cebu Institute of Technology University (CITU)",
                        "Salazar Colleges", "Cebu City Medical Center",
                        "Cebu South Bus Terminal (CSBT)",
                        "University of San Jose Recoletos", "Tiburcio Padilla Street",
                        "B Benedicto Street", "General Maxilom Ave Ext",
                        "White Gold House", "A Soriano Ave", "SM City Cebu",
                        "F Cabahug Street"),
                13.0,
                "Long route from southern Bulacao through the south bus terminal and commercial corridor to SM City Cebu. Passes two USJ-R campuses, CITU, and Cebu City Medical Center. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("09G", "Quiot", "Sto Nino Brgy Hall",
                "Mambaling, Jakosalem, Cebu City Hall",
                Arrays.asList(
                        "Quiot", "Southwestern University Basak Campus",
                        "Don Vicente Rama Memorial National High School",
                        "Shopwise", "Mambaling Flyover", "C Padilla Street",
                        "R Padilla Street", "Carlock Street",
                        "San Nicolas de Tolentino Parish Church",
                        "Leon Kilat Street", "University of San Jose Recoletos",
                        "Dionisio Jakosalem Street", "Cebu City Hall",
                        "La Nueva", "Metropolitan Cebu Water District",
                        "Department of Foreign Affairs (DFA)",
                        "Sto Nino Brgy Hall"),
                13.0,
                "Route from Quiot through Mambaling and the city hall corridor ending at Sto Nino Barangay Hall. Passes SWU Basak Campus, Leon Kilat Street, and key government offices. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("13C", "Tintay Jeepney Terminal", "Colonnade Supermarket",
                "Talamban, Banilad, Ayala Center",
                Arrays.asList(
                        "Tintay Jeepney Terminal", "Cebu Mary Immaculate College",
                        "Talamban Elementary School", "Gaisano Grand Mall",
                        "Aicila Suites Hotel", "USC",
                        "Banilad Town Center", "Gaisano Country Mall",
                        "University of Cebu Banilad Campus",
                        "Paradise Village Road", "Samantabhadra Institute",
                        "Waterfront Hotel", "P Cabantan", "Pag-ibig",
                        "Standard Chartered Bank",
                        "Insular Life Cebu Business Center",
                        "Ayala Center Cebu", "Hotel Elizabeth Cebu",
                        "Asilo De La Milagrosa",
                        "Colegio de la Inmaculada Concepcion",
                        "Gen Echavez Street", "Sikatuna Street",
                        "Colon Obelisk", "University of Visayas",
                        "Gaisano Main", "Colonnade Supermarket"),
                13.0,
                "Long route from Talamban through Banilad's commercial strip and Ayala Center down to Colon. Passes multiple universities, major malls, and Waterfront Hotel. One of the longest PUJ routes in Cebu City. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

        PUJS.add(new PujRoute("09C", "Quiot", "Colon Obelisk",
                "Mambaling, CSBT, Sikatuna",
                Arrays.asList(
                        "Quiot", "Southwestern University Basak Campus",
                        "Don Vicente Rama Memorial National High School",
                        "Shopwise", "Mambaling Flyover",
                        "Cebu Institute of Technology University (CITU)",
                        "Salazar Colleges", "Cebu City Medical Center",
                        "Cebu South Bus Terminal (CSBT)",
                        "University of San Jose Recoletos",
                        "Sikatuna Street", "Colon Obelisk"),
                13.0,
                "Route from Quiot through Mambaling and the south bus terminal to Colon. Passes CITU, Salazar Colleges, and Cebu City Medical Center. Shorter alternative to 09G ending at the historic Colon Obelisk. Minimum fare ₱13 (first 4km), +₱1.80/km after."));
    }

    public static PujRoute getByCode(String code) {
        return PUJS.stream()
                .filter(p -> p.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);
    }
}