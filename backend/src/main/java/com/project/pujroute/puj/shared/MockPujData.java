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
                                                "Zulueta Street", "MJ Cuenca Ave", "Tiburcio Padilla Street",
                                                "B Benedicto Street",
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
                                                "Fuente Osmeña Circle", "Crown Regency Hotel",
                                                "Abellana Sports Complex", "Social Security System (SSS)",
                                                "GV Tower Hotel", "Metro Colon"),
                                13.0,
                                "Alternative Mabolo route through Fuente Osmeña and Mango Avenue corridor. Passes USC North Campus, major residential towers, and Abellana Sports Complex. Minimum fare ₱13 (first 4km), +₱1.80/km after."));

                PUJS.add(new PujRoute("12G", "Punta Princesa", "SM City Cebu",
                                "Taboan, Jakosalem, Pier 1",
                                Arrays.asList(
                                                "Punta Princesa", "Punta Princesa Elementary School",
                                                "Miller Hospital", "Cebu Institute of Technology University (CITU)",
                                                "Carlock Street", "Elizabeth Mall (Emall)", "B Aranas Street",
                                                "Taboan Public Market",
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

                // ================== NEW ROUTES ==================

                // 03L – Mabolo to Carbon
                PUJS.add(new PujRoute(
                                "03L",
                                "P Cabantan",
                                "Carbon Public Market",
                                "Waterfront, Jakosalem, Carbon",
                                Arrays.asList(
                                                "P Cabantan",
                                                "Waterfront Hotel",
                                                "San Carlos Seminary Complex",
                                                "PLDT",
                                                "Camelita Monastery",
                                                "St Joseph Parish",
                                                "The Persimmon",
                                                "Hipodromo",
                                                "Carreta Cemetery",
                                                "Imus Ave",
                                                "Museo Sugbo",
                                                "CPILS",
                                                "Tiburcio Padilla Street",
                                                "Commission on Audit (COA)",
                                                "Cebu Technological University",
                                                "Vicente Gullas Street",
                                                "Dionisio Jakosalem Street",
                                                "Legaspi Street",
                                                "Progreso Street",
                                                "Carbon Public Market"),
                                13.0,
                                "Route from P Cabantan through Mabolo and downtown Jakosalem corridor to Carbon Public Market."));

                // 03Q – Ayala to SM
                PUJS.add(new PujRoute(
                                "03Q",
                                "Ayala Center Cebu",
                                "SM City Cebu",
                                "Juan Luna Ave",
                                Arrays.asList(
                                                "Ayala Center Cebu",
                                                "Landers Superstore Cebu",
                                                "Juan Luna Ave",
                                                "SM City Cebu"),
                                13.0,
                                "Short connector between Ayala Center Cebu and SM City Cebu via Juan Luna Avenue."));

                // 04B – Lahug to Carbon
                PUJS.add(new PujRoute(
                                "04B",
                                "Stephenson Street",
                                "Carbon Public Market",
                                "Lahug, Capitol, City Hall, Carbon",
                                Arrays.asList(
                                                "Stephenson Street",
                                                "Salinas Drive",
                                                "JY Square Mall",
                                                "Sudlon",
                                                "The Church of Jesus Christ of Latter-day Saints Temple",
                                                "Lahug Brgy Hall",
                                                "University of the Philippines",
                                                "Gorordo Ave",
                                                "Escario Central Mall",
                                                "Cebu Provincial Capitol",
                                                "Cebu Doctors University Hospital",
                                                "Fuente Osmeña Circle",
                                                "Robinsons Place",
                                                "Crown Regency Hotel",
                                                "Abellana Sports Complex",
                                                "USC Main Campus",
                                                "Colonnade Supermarket",
                                                "Legaspi Street",
                                                "Cebu Metropolitan Cathedral",
                                                "Sto Nino Brgy Hall",
                                                "Osmena Blvd",
                                                "Metropolitan Cebu Water District",
                                                "La Nueva",
                                                "Cebu City Hall",
                                                "Carbon Public Market"),
                                13.0,
                                "Route from Lahug through Gorordo, Capitol, Fuente Osmeña, and City Hall corridor to Carbon Public Market."));

                // 04H – Plaza Housing to Carbon
                PUJS.add(new PujRoute(
                                "04H",
                                "Busay",
                                "Carbon Public Market",
                                "Busay, Lahug, Capitol, Carbon",
                                Arrays.asList(
                                                "Busay",
                                                "Cebu Veterans Drive",
                                                "Marco Polo Hotel",
                                                "JY Square Mall",
                                                "Sudlon",
                                                "The Church of Jesus Christ of Latter-day Saints Temple",
                                                "Lahug Brgy Hall",
                                                "University of the Philippines",
                                                "Harolds Hotel Cebu",
                                                "Escario Central Mall",
                                                "Cebu Provincial Capitol",
                                                "Cebu Doctors University Hospital",
                                                "Fuente Osmeña Circle",
                                                "Robinsons Place",
                                                "Crown Regency Hotel",
                                                "Abellana Sports Complex",
                                                "Social Security System (SSS)",
                                                "GV Tower Hotel",
                                                "University of Cebu",
                                                "Panganiban Street",
                                                "Katipunan Lumber",
                                                "Carbon Public Market"),
                                13.0,
                                "Uphill route from Busay down through Lahug and Capitol area to Carbon Public Market."));

                // 04I – Plaza Housing to Carbon
                PUJS.add(new PujRoute(
                                "04I",
                                "Busay",
                                "Carbon Public Market",
                                "Busay, Lahug, Progreso, Carbon",
                                Arrays.asList(
                                                "Busay",
                                                "Cebu Veterans Drive",
                                                "Marco Polo Hotel",
                                                "JY Square Mall",
                                                "Sudlon",
                                                "The Church of Jesus Christ of Latter-day Saints Temple",
                                                "Lahug Brgy Hall",
                                                "University of the Philippines",
                                                "Harolds Hotel Cebu",
                                                "Escario Central Mall",
                                                "Cebu Provincial Capitol",
                                                "Cebu Doctors University Hospital",
                                                "Fuente Osmeña Circle",
                                                "Robinsons Place",
                                                "Crown Regency Hotel",
                                                "Abellana Sports Complex",
                                                "Social Security System (SSS)",
                                                "GV Tower Hotel",
                                                "University of Cebu",
                                                "Panganiban Street",
                                                "Katipunan Lumber",
                                                "Progreso Street",
                                                "Carbon Public Market"),
                                13.0,
                                "Variant of 04H passing via Progreso Street before Carbon Public Market."));

                // 04L – Lahug to SM
                PUJS.add(new PujRoute(
                                "04L",
                                "Lahug",
                                "SM City Cebu",
                                "Lahug, Gorordo, Cebu Business Park, SM",
                                Arrays.asList(
                                                "Lahug",
                                                "JY Square Mall",
                                                "Sudlon",
                                                "The Church of Jesus Christ of Latter-day Saints Temple",
                                                "Lahug Brgy Hall",
                                                "University of the Philippines",
                                                "Gorordo Ave",
                                                "The Golden Peak Hotel",
                                                "Kuya J's Restaurant",
                                                "Cebu Parklane Hotel",
                                                "Pag-ibig Fund Cebu Office",
                                                "Standard Chartered Bank",
                                                "Insular Life Cebu Business Center",
                                                "Keppel Tower Cebu Business Park",
                                                "Pope John Paul II Ave",
                                                "PLDT",
                                                "Camelita Monastery",
                                                "St Joseph Parish",
                                                "SM City Cebu"),
                                13.0,
                                "Route from Lahug through Gorordo and Cebu Business Park down to SM City Cebu."));

                // 04M – Lahug to Ayala PUV Terminal
                PUJS.add(new PujRoute(
                                "04M",
                                "JY Square Mall",
                                "Ayala Public Utility Vehicle Terminal",
                                "Salinas Drive, IT Park, Waterfront",
                                Arrays.asList(
                                                "JY Square Mall",
                                                "Salinas Drive",
                                                "University of Southern Philippines",
                                                "IT Park",
                                                "Waterfront Hotel",
                                                "Ayala Public Utility Vehicle Terminal"),
                                13.0,
                                "Short Lahug connector through IT Park to Ayala PUV Terminal."));

                // 06B – Guadalupe to downtown
                PUJS.add(new PujRoute(
                                "06B",
                                "Guadalupe Church",
                                "Osmena Blvd",
                                "Guadalupe, Capitol, Colon, City Hall",
                                Arrays.asList(
                                                "Guadalupe Church",
                                                "Fooda Guadalupe",
                                                "Professional Regulations Commission (PRC)",
                                                "Cebu Provincial Capitol",
                                                "Cebu Doctors University Hospital",
                                                "Robinsons Place",
                                                "Crown Regency Hotel",
                                                "Abellana Sports Complex",
                                                "Social Security System (SSS)",
                                                "GV Tower Hotel",
                                                "Metro Colon",
                                                "Magallanes Street",
                                                "Cebu City Hall",
                                                "La Nueva",
                                                "Osmena Blvd"),
                                13.0,
                                "Route from Guadalupe through Capitol and Fuente Osmeña to downtown Colon and City Hall area."));

                // 06C – Guadalupe to Carbon
                PUJS.add(new PujRoute(
                                "06C",
                                "Guadalupe Church",
                                "Osmena Blvd",
                                "Guadalupe, Colon, Carbon, City Hall",
                                Arrays.asList(
                                                "Guadalupe Church",
                                                "Fooda Guadalupe",
                                                "Professional Regulations Commission (PRC)",
                                                "Vicente Sotto Hospital",
                                                "Robinsons Place",
                                                "Crown Regency Hotel",
                                                "Abellana Sports Complex",
                                                "Social Security System (SSS)",
                                                "Metro Colon",
                                                "Plaridel Street",
                                                "Carbon Public Market",
                                                "Cebu City Hall",
                                                "La Nueva",
                                                "Metropolitan Cebu Water District",
                                                "Osmena Blvd"),
                                13.0,
                                "Guadalupe route via Vicente Sotto and Plaridel Street to Carbon Public Market and City Hall."));

                // 06G – Guadalupe to Tabo-an/Pasil
                PUJS.add(new PujRoute(
                                "06G",
                                "Guadalupe Church",
                                "R Padilla Street",
                                "Guadalupe, USC South, Tabo-an/Pasil",
                                Arrays.asList(
                                                "Guadalupe Church",
                                                "Fooda Guadalupe",
                                                "Professional Regulations Commission (PRC)",
                                                "Securities and Exchange Commission (SEC)",
                                                "Calamba Cemetery",
                                                "USC South Campus",
                                                "J Alcantara",
                                                "Tres de Abril Street",
                                                "Miller Hospital",
                                                "Carlock Street",
                                                "Pasil Fish Market",
                                                "Don Carlos Gothong High School",
                                                "Carlock Street",
                                                "R Padilla Street"),
                                13.0,
                                "Route from Guadalupe through Calamba and USC South Campus to Tabo-an and Pasil market area."));

                // 06H – Guadalupe to SM
                PUJS.add(new PujRoute(
                                "06H",
                                "Guadalupe Church",
                                "SM City Cebu",
                                "Guadalupe, Capitol, Ayala, SM",
                                Arrays.asList(
                                                "Guadalupe Church",
                                                "Fooda Guadalupe",
                                                "Professional Regulations Commission (PRC)", // add (PRC)
                                                "Cebu Provincial Capitol",
                                                "Escario Central Mall",
                                                "The Golden Peak Hotel",
                                                "Kuya J's Restaurant",
                                                "Ayala Center Cebu", // match existing name
                                                "Keppel Tower Cebu Business Park",
                                                "Pope John Paul II Ave",
                                                "PLDT",
                                                "Camelita Monastery",
                                                "St Joseph Parish",
                                                "Cebu Daily News",
                                                "SM City Cebu"),
                                13.0,
                                "Route from Guadalupe through Capitol and Ayala area to SM City Cebu."));

                // 07B – Banawa to Carbon
                PUJS.add(new PujRoute(
                                "07B",
                                "Court of Appeals",
                                "Carbon Public Market",
                                "Banawa, Capitol, Colon, Carbon",
                                Arrays.asList(
                                                "Court of Appeals",
                                                "R Arcenas Street",
                                                "Good Shepherd Street",
                                                "Jose Fortich Street", // fix spelling from Fortichi
                                                "Cebu Provincial Capitol",
                                                "Cebu Doctors University Hospital",
                                                "Robinsons Place",
                                                "Crown Regency Hotel",
                                                "Abellana Sports Complex",
                                                "Social Security System (SSS)", // single SSS spelling
                                                "GV Tower Hotel",
                                                "Metro Colon",
                                                "Magallanes Street",
                                                "Progreso Street",
                                                "Carbon Public Market"),
                                13.0,
                                "Banawa route passing Capitol and Fuente area down to Carbon Public Market via Progreso Street."));

                // 08F – Alumnos to SM
                PUJS.add(new PujRoute(
                                "08F",
                                "Alumnos",
                                "SM City Cebu",
                                "Pasil, Magallanes, SM",
                                Arrays.asList(
                                                "Alumnos",
                                                "Tagunol Street",
                                                "C Padilla Street",
                                                "Carlock Street",
                                                "Spolarium Street",
                                                "Leon Kilat Street",
                                                "Magallanes Street",
                                                "P Burgos Street",
                                                "Legazpi Exit", // use existing spelling
                                                "Sergio Osmeña Jr Blvd", // fix Osmena -> Osmeña
                                                "B Benedicto Street", // match existing
                                                "JC Veyra Street",
                                                "SM City Cebu"),
                                13.0,
                                "Route from Alumnos through Pasil and Magallanes corridor to SM City Cebu."));

                // 08G – Alumnos to Colon
                PUJS.add(new PujRoute(
                                "08G",
                                "Alumnos",
                                "MJ Cuenca Ave",
                                "Pasil, Leon Kilat, Colon",
                                Arrays.asList(
                                                "Alumnos",
                                                "Tagunol Street",
                                                "C Padilla Street",
                                                "Carlock Street",
                                                "Spolarium Street",
                                                "Leon Kilat Street",
                                                "Metro Colon",
                                                "Colonnade Supermarket",
                                                "Gaisano Main",
                                                "University of Visayas",
                                                "Colon Obelisk",
                                                "MJ Cuenca Ave"),
                                13.0,
                                "Route from Alumnos through Pasil and downtown Colon to MJ Cuenca Avenue."));

                // 09F – Basak to Ibabao (downtown core)
                PUJS.add(new PujRoute(
                                "09F",
                                "Quiot",
                                "Cebu Metropolitan Cathedral",
                                "Mambaling, CSBT, Colon, Cathedral",
                                Arrays.asList(
                                                "Quiot",
                                                "Southwestern University Basak Campus",
                                                "Don Vicente Rama Memorial National High School",
                                                "Shopwise",
                                                "Mambaling Flyover",
                                                "Cebu Institute of Technology University (CITU)",
                                                "Salazar Colleges",
                                                "Cebu City Medical Center",
                                                "Cebu South Bus Terminal (CSBT)",
                                                "USC Main Campus",
                                                "Gaisano Main",
                                                "University of Visayas",
                                                "Zulueta Street",
                                                "MJ Cuenca Ave",
                                                "Cebu Technological University",
                                                "Legazpi Exit",
                                                "Cebu Metropolitan Cathedral"),
                                13.0,
                                "Route from Basak/Quiot through Mambaling and CSBT to the Cathedral and downtown core."));

                // 10F – Bulacao to Junquera/Colon
                PUJS.add(new PujRoute(
                                "10F",
                                "Bulacao",
                                "Junquera Street",
                                "Bulacao, CSBT, Colon",
                                Arrays.asList(
                                                "Bulacao",
                                                "Pardo",
                                                "University of San Jose Recoletos",
                                                "Shopwise",
                                                "Mambaling Flyover",
                                                "Cebu Institute of Technology University (CITU)",
                                                "Salazar Colleges",
                                                "Cebu City Medical Center",
                                                "Cebu South Bus Terminal (CSBT)",
                                                "University of San Jose Recoletos",
                                                "Junquera Street"),
                                13.0,
                                "Bulacao route through Mambaling and CSBT terminating at Junquera Street near Colon."));

                // 10G – Pardo to Sto Niño
                PUJS.add(new PujRoute(
                                "10G",
                                "Pardo",
                                "Sto Nino Brgy Hall",
                                "Pardo, Mambaling, City Hall, Sto Niño",
                                Arrays.asList(
                                                "Pardo",
                                                "University of San Jose Recoletos",
                                                "Shopwise",
                                                "Mambaling Flyover",
                                                "C Padilla Street",
                                                "R Padilla Street",
                                                "Carlock Street",
                                                "San Nicolas de Tolentino Parish Church",
                                                "Leon Kilat Street",
                                                "Dionisio Jakosalem Street",
                                                "Cebu City Hall",
                                                "La Nueva",
                                                "Metropolitan Cebu Water District",
                                                "Osmena Blvd",
                                                "Sto Nino Brgy Hall"),
                                13.0,
                                "Pardo route via Mambaling and City Hall corridor ending at Sto Nino Barangay Hall."));

                // 10M – Bulacao to SM
                PUJS.add(new PujRoute(
                                "10M",
                                "Bulacao",
                                "SM City Cebu",
                                "Bulacao, Mambaling, Colon, SM",
                                Arrays.asList(
                                                "Bulacao",
                                                "Pardo",
                                                "University of San Jose Recoletos",
                                                "Shopwise",
                                                "Mambaling Flyover",
                                                "Cebu Institute of Technology University (CITU)",
                                                "Salazar Colleges",
                                                "Cebu City Medical Center",
                                                "Cebu South Bus Terminal (CSBT)",
                                                "Elizabeth Mall (Emall)", // add parentheses
                                                "Leon Kilat Street",
                                                "Metro Colon",
                                                "Colonnade Supermarket",
                                                "Gaisano Main",
                                                "University of Visayas",
                                                "Colon Obelisk",
                                                "Zulueta Street",
                                                "MJ Cuenca Ave",
                                                "National Statistics Office (NSO)", // same as 01K
                                                "Tiburcio Padilla Street",
                                                "B Benedicto Street",
                                                "General Maxilom Ave Ext",
                                                "SM City Cebu"),
                                13.0,
                                "Bulacao route via Mambaling and Colon providing direct connection to SM City Cebu."));

                // 11A – Inayawan to Colon area
                PUJS.add(new PujRoute(
                                "11A",
                                "Inayawan Church",
                                "University of Visayas",
                                "Inayawan, Pasil, Magallanes, Colon",
                                Arrays.asList(
                                                "Inayawan Church",
                                                "Rizal Avenue",
                                                "Tagunol Street",
                                                "C Padilla Street",
                                                "Carlock Street",
                                                "Pasil Fish Market",
                                                "Spolarium Street",
                                                "Magallanes Street",
                                                "Dionisio Jakosalem Street",
                                                "University of Visayas"),
                                13.0,
                                "Route from Inayawan through Pasil and Magallanes corridor to the Colon university area."));

                // 12D – Labangon to Colon
                PUJS.add(new PujRoute(
                                "12D",
                                "Punta Princesa",
                                "F Urdaneta Street",
                                "Labangon, N. Bacalso, Colon",
                                Arrays.asList(
                                                "Punta Princesa",
                                                "Tisa Elementary School",
                                                "Tisa National High School",
                                                "Katipunan Street",
                                                "Labangon Public Market",
                                                "Labangon Elementary School",
                                                "Tres de Abril Street",
                                                "N Bacalso Ave",
                                                "PLDT",
                                                "Cebu City Medical Center",
                                                "Cebu South Bus Terminal (CSBT)",
                                                "University of San Jose Recoletos",
                                                "USC Main Campus",
                                                "Gaisano Main",
                                                "University of Visayas",
                                                "Colon Obelisk",
                                                "Vicente Gullas Street",
                                                "University of Southern Philippines Foundation",
                                                "F Urdaneta Street"),
                                13.0,
                                "Route from Punta Princesa through Labangon and N. Bacalso to the Colon university belt."));

                // 12I – Labangon to SM
                PUJS.add(new PujRoute(
                                "12I",
                                "Punta Princesa",
                                "SM City Cebu",
                                "Labangon, N. Bacalso, Piers, SM",
                                Arrays.asList(
                                                "Punta Princesa",
                                                "Tisa Elementary School",
                                                "Tisa National High School",
                                                "Katipunan Street",
                                                "Labangon Public Market",
                                                "Labangon Elementary School",
                                                "Tres de Abril Street",
                                                "N Bacalso Ave",
                                                "PLDT",
                                                "Cebu City Medical Center",
                                                "Cebu South Bus Terminal (CSBT)",
                                                "University of San Jose Recoletos",
                                                "USC Main Campus",
                                                "Gaisano Main",
                                                "University of Visayas",
                                                "Colon Obelisk",
                                                "Vicente Gullas Street",
                                                "University of Southern Philippines Foundation",
                                                "P Burgos Street",
                                                "Legazpi Exit",
                                                "Pier 1",
                                                "Pier 2",
                                                "Pier 3",
                                                "Pier 4",
                                                "Pier 5",
                                                "SM City Cebu"),
                                13.0,
                                "Labangon route via N. Bacalso, Colon, and the port area to SM City Cebu."));

                // 12L – Labangon to Ayala
                PUJS.add(new PujRoute(
                                "12L",
                                "Punta Princesa",
                                "Ayala Center Cebu",
                                "Labangon, N. Bacalso, Mango, Ayala",
                                Arrays.asList(
                                                "Punta Princesa",
                                                "Punta Princesa Elementary School",
                                                "Miller Hospital",
                                                "Labangon Public Market",
                                                "Labangon Elementary School",
                                                "Tres de Abril Street",
                                                "N Bacalso Ave",
                                                "PLDT",
                                                "J Alcantara",
                                                "USC South Campus",
                                                "Calamba Cemetery",
                                                "Vicente Sotto Hospital",
                                                "Mango Square Mall",
                                                "Horizons 101",
                                                "Fooda Saversmart",
                                                "USC North Campus",
                                                "Colegio de la Inmaculada Concepcion",
                                                "Ayala Center Cebu"),
                                13.0,
                                "Labangon route through N. Bacalso and Mango Avenue to Ayala Center Cebu."));

                // 13B – Talamban to Carbon
                PUJS.add(new PujRoute(
                                "13B",
                                "Tintay Jeepney Terminal",
                                "Carbon Public Market",
                                "Talamban, Banilad, Ayala, Colon, Carbon",
                                Arrays.asList(
                                                "Tintay Jeepney Terminal",
                                                "Cebu Mary Immaculate College",
                                                "Talamban Elementary School",
                                                "Gaisano Grand Mall",
                                                "Aicila Suites Hotel",
                                                "USC",
                                                "Banilad Town Center",
                                                "Gaisano Country Mall",
                                                "University of Cebu Banilad Campus",
                                                "Paradise Village Road",
                                                "Cebu Country Club",
                                                "Samantabhadra Institute",
                                                "Waterfront Hotel",
                                                "P Cabantan",
                                                "Pag-ibig",
                                                "Standard Chartered Bank",
                                                "Insular Life Cebu Business Center",
                                                "Ayala Center Cebu",
                                                "Hotel Elizabeth Cebu",
                                                "Asilo De La Milagrosa",
                                                "Colegio de la Inmaculada Concepcion",
                                                "Gen Echavez Street",
                                                "Allsons Inn",
                                                "Ramos Public Market",
                                                "LS Pension House",
                                                "University of San Carlos Recoletos",
                                                "Gaisano Main",
                                                "University of Visayas",
                                                "Colon Obelisk",
                                                "Vicente Gullas Street",
                                                "Dionisio Jakosalem Street",
                                                "Legaspi Street",
                                                "Progreso Street",
                                                "Carbon Public Market"),
                                13.0,
                                "Long Talamban route through Banilad and Ayala down to Colon and Carbon Public Market."));

                // 13H – Pitos to Mandaue
                PUJS.add(new PujRoute(
                                "13H",
                                "Pitos",
                                "New Mandaue Public Market",
                                "Pitos, Banilad, AS Fortuna, Mandaue",
                                Arrays.asList(
                                                "Pitos",
                                                "Bacayan",
                                                "Smeag Sparta",
                                                "Pelish English School",
                                                "Gaisano Grand Mall",
                                                "Aicila Suites Hotel",
                                                "USC",
                                                "Cebu Home and Builders Centre", // normalize name
                                                "Oftana Suites",
                                                "Allure Hotel and Suites",
                                                "Benedicto College",
                                                "The Orchard Cebu Hotel and Suites",
                                                "SM JMall",
                                                "Mandaue City",
                                                "Andy Hotel",
                                                "A Del Rosario Street",
                                                "Mandaue Public Market",
                                                "Mandaue Colonnade Supermarket",
                                                "Mandaue City Sports and Cultural Complex",
                                                "Bureau of Internal Revenue (BIR)",
                                                "New Mandaue Public Market"),
                                13.0,
                                "Route from Pitos through Banilad and AS Fortuna to the Mandaue public market area."));

                // 14D – Ayala to Colon
                PUJS.add(new PujRoute(
                                "14D",
                                "Ayala Center Cebu",
                                "Legaspi Street",
                                "Ayala, Escario, Capitol, Colon",
                                Arrays.asList(
                                                "Ayala Center Cebu",
                                                "Quest Hotel Cebu",
                                                "Harolds Hotel Cebu",
                                                "Escario Central Mall",
                                                "Cebu Provincial Capitol",
                                                "Cebu Doctors University Hospital",
                                                "Robinsons Place",
                                                "Cebu Institute of Medicine",
                                                "Cofta Mouldings Corporation",
                                                "USC Main Campus",
                                                "Gaisano Main",
                                                "University of Visayas",
                                                "Colon Obelisk",
                                                "Vicente Gullas Street",
                                                "Dionisio Jakosalem Street",
                                                "Legaspi Street"),
                                13.0,
                                "Route from Ayala through Escario and Capitol area to the Colon university belt."));

                // 17B – Apas to Carbon (via Magallanes)
                PUJS.add(new PujRoute(
                                "17B",
                                "Apas",
                                "Carbon Public Market",
                                "IT Park, Lahug, Capitol, Carbon",
                                Arrays.asList(
                                                "Apas",
                                                "Camp Lapu Lapu Elementary School",
                                                "PNP Training Center Field",
                                                "IT Park",
                                                "University of Southern Philippines",
                                                "Salinas Drive",
                                                "Lahug",
                                                "JY Square Mall",
                                                "Sudlon",
                                                "The Church of Jesus Christ of Latter-day Saints Temple",
                                                "Lahug Brgy Hall",
                                                "University of the Philippines",
                                                "Harolds Hotel Cebu",
                                                "Escario Central Mall",
                                                "Cebu Provincial Capitol",
                                                "Cebu Doctors University Hospital",
                                                "Robinsons Place",
                                                "Crown Regency Hotel",
                                                "Abellana Sports Complex",
                                                "Social Security System (SSS)",
                                                "GV Tower Hotel",
                                                "Metro Colon",
                                                "University of San Jose Recoletos",
                                                "Magallanes Street",
                                                "Progreso Street",
                                                "Carbon Public Market"),
                                13.0,
                                "Apas route via IT Park, Lahug, and Capitol to Colon and Carbon Public Market."));

                // 17C – Apas to Carbon (via Mango, Katipunan)
                PUJS.add(new PujRoute(
                                "17C",
                                "Apas",
                                "Carbon Public Market",
                                "IT Park, Gorordo, Mango, Carbon",
                                Arrays.asList(
                                                "Apas",
                                                "Camp Lapu Lapu Elementary School",
                                                "PNP Training Center Field",
                                                "IT Park",
                                                "University of Southern Philippines",
                                                "Salinas Drive",
                                                "Lahug",
                                                "JY Square Mall",
                                                "Sudlon",
                                                "The Church of Jesus Christ of Latter-day Saints Temple",
                                                "Lahug Brgy Hall",
                                                "University of the Philippines",
                                                "Gorordo Ave",
                                                "The Golden Peak Hotel", // match earlier spelling
                                                "Royal Concourse Gourmet Mall",
                                                "Asilo De La Milagrosa",
                                                "Colegio de la Inmaculada Concepcion",
                                                "USC North Campus",
                                                "Fooda Saversmart",
                                                "Horizons 101",
                                                "Mango Square Mall",
                                                "Robinsons Place",
                                                "Cebu Institute of Medicine",
                                                "Cofta Mouldings Corporation",
                                                "USC Main Campus",
                                                "Sogo",
                                                "GV Tower Hotel",
                                                "University of Cebu",
                                                "Panganiban Street",
                                                "Katipunan Lumber",
                                                "University of San Jose Recoletos",
                                                "Progreso Street",
                                                "Carbon Public Market"),
                                13.0,
                                "Apas route via IT Park, Gorordo, Mango Avenue, and Katipunan Lumber to Carbon Public Market."));

                // 17D – Apas to Carbon (via Taboan/Pasil)
                PUJS.add(new PujRoute(
                                "17D",
                                "Apas",
                                "Carbon Public Market",
                                "IT Park, Lahug, Pasil, Carbon",
                                Arrays.asList(
                                                "Apas",
                                                "Camp Lapu Lapu Elementary School",
                                                "PNP Training Center Field",
                                                "IT Park",
                                                "University of Southern Philippines",
                                                "Salinas Drive",
                                                "Lahug",
                                                "JY Square Mall",
                                                "Sudlon",
                                                "The Church of Jesus Christ of Latter-day Saints Temple",
                                                "Lahug Brgy Hall",
                                                "University of the Philippines",
                                                "Harolds Hotel Cebu",
                                                "Escario Central Mall",
                                                "Cebu Provincial Capitol",
                                                "Cebu Doctors University Hospital",
                                                "Robinsons Place",
                                                "Crown Regency Hotel",
                                                "Abellana Sports Complex",
                                                "Social Security System (SSS)",
                                                "GV Tower Hotel",
                                                "University of Cebu",
                                                "Panganiban Street",
                                                "Taboan Public Market",
                                                "Spolarium Street",
                                                "University of San Jose Recoletos",
                                                "Progreso Street",
                                                "Carbon Public Market"),
                                13.0,
                                "Apas route via IT Park, Lahug, and Taboan public market to Carbon Public Market."));

                // 20A – Ayala to Mandaue
                PUJS.add(new PujRoute(
                                "20A",
                                "Ayala Center Cebu",
                                "Pacific Mall",
                                "Ayala, Mabolo, Subangdaku, Mandaue",
                                Arrays.asList(
                                                "Ayala Center Cebu",
                                                "Cebu Business Park Waste Water Treatment Facility",
                                                "Mactan Street",
                                                "The Persimmon",
                                                "St Joseph Parish",
                                                "Express Inn",
                                                "Microdata Systems and Management Inc", // small plural fix
                                                "Ginebra San Miguel Inc",
                                                "Kingdom Resources Corporation",
                                                "Subangdaku Elementary School",
                                                "National Telecommunications Office",
                                                "Matimco Inc",
                                                "Macro Tires Goodyear Autocare",
                                                "Colegio de la Inmaculada Concepcion Mandaue",
                                                "Hall of Justice",
                                                "Cebu International Convention Center",
                                                "Mandaue Public Market",
                                                "Mandaue Colonnade Supermarket",
                                                "Mandaue City Sports and Cultural Complex",
                                                "Bureau of Internal Revenue (BIR)",
                                                "New Mandaue Public Market",
                                                "Bureau of Immigration",
                                                "Mandaue City Hall",
                                                "Cortes General Hospital",
                                                "SB Cabahug AC Cortes Ave",
                                                "Matimco Inc", // appears twice as in source
                                                "Department of Foreign Affairs (DFA)",
                                                "Pacific Mall"),
                                13.0,
                                "Route from Ayala Center Cebu through Mabolo and Subangdaku to Mandaue and Pacific Mall."));

                // 21A – Mandaue to Cathedral
                PUJS.add(new PujRoute(
                                "21A",
                                "Royal Oaks International School",
                                "P Burgos Street",
                                "AS Fortuna, Subangdaku, Pier 3, Cathedral",
                                Arrays.asList(
                                                "Royal Oaks International School",
                                                "Kosmos Furniture Designs Philippines Inc",
                                                "Bridges Town Square",
                                                "Hotel Nenita",
                                                "Grand Arcade Building",
                                                "Mandaue Coliseum",
                                                "STI College",
                                                "Savemore",
                                                "SM JMall",
                                                "Mandaue City",
                                                "Coca-Cola Bottlers Philippines Inc",
                                                "Macro Tires Goodyear Autocare",
                                                "Matimco Inc",
                                                "National Telecommunications Office",
                                                "Cebu North Bus Terminal",
                                                "F Cabahug Street",
                                                "SM City Cebu",
                                                "Queen City Memorial Garden",
                                                "White Gold House",
                                                "B Benedicto Street",
                                                "Pier 3",
                                                "V Sotto Street",
                                                "Commission on Audit (COA)",
                                                "Cebu Technological University",
                                                "P Burgos Street"),
                                13.0,
                                "Route from Mandaue and SM JMall area through SM City Cebu and the port area to the Cathedral vicinity."));

                // 22A – Mandaue to Cathedral
                PUJS.add(new PujRoute(
                                "22A",
                                "CM Cabahug",
                                "P Burgos Street",
                                "Mandaue, Subangdaku, Mabolo, Cathedral",
                                Arrays.asList(
                                                "CM Cabahug",
                                                "A Mabini Street",
                                                "Mandaue City Central School",
                                                "Mandaue City Hall",
                                                "Gaisano Grand Mall Mandaue",
                                                "A Del Rosario Street",
                                                "Colegio de la Inmaculada Concepcion Mandaue",
                                                "Macro Tires Goodyear Autocare",
                                                "Matimco Inc",
                                                "National Telecommunications Office",
                                                "Subangdaku Elementary School",
                                                "Kingdom Resources Corporation",
                                                "Ginebra San Miguel Inc",
                                                "Microdata Systems and Management Inc",
                                                "Express Inn",
                                                "St Joseph Parish",
                                                "The Persimmon",
                                                "Hipodromo",
                                                "Carreta Cemetery",
                                                "Imus Ave",
                                                "Museo Sugbo",
                                                "CPILS",
                                                "Tiburcio Padilla Street",
                                                "National Statistics Office (NSO)",
                                                "Commission on Audit (COA)",
                                                "P Burgos Street"),
                                13.0,
                                "Route from Mandaue City Hall and Subangdaku through Mabolo and Museo Sugbo to the Cathedral vicinity."));

                // 22D – Mandaue to Cathedral
                PUJS.add(new PujRoute(
                                "22D",
                                "CM Cabahug",
                                "P Burgos Street",
                                "Mandaue, Subangdaku, Mabolo, Cathedral",
                                Arrays.asList(
                                                "CM Cabahug",
                                                "A Mabini Street",
                                                "Mandaue City Central School",
                                                "Mandaue City Hall",
                                                "Gaisano Grand Mall Mandaue",
                                                "A Del Rosario Street",
                                                "Colegio de la Inmaculada Concepcion Mandaue",
                                                "Macro Tires Goodyear Autocare",
                                                "Matimco Inc",
                                                "National Telecommunications Office",
                                                "Subangdaku Elementary School",
                                                "Kingdom Resources Corporation",
                                                "Ginebra San Miguel Inc",
                                                "Microdata Systems and Management Inc",
                                                "Express Inn",
                                                "St Joseph Parish",
                                                "The Persimmon",
                                                "Hipodromo",
                                                "Carreta Cemetery",
                                                "Imus Ave",
                                                "Museo Sugbo",
                                                "CPILS",
                                                "Tiburcio Padilla Street",
                                                "National Statistics Office (NSO)",
                                                "Commission on Audit (COA)",
                                                "P Burgos Street"),
                                13.0,
                                "Variant Mandaue route via Subangdaku and Mabolo to the Cathedral vicinity."));

                // 22I – Mandaue to Gaisano Country Mall
                PUJS.add(new PujRoute(
                                "22I",
                                "New Mandaue Public Market",
                                "Gaisano Country Mall",
                                "Mandaue, AS Fortuna, Banilad",
                                Arrays.asList(
                                                "New Mandaue Public Market",
                                                "Bureau of Immigration",
                                                "Mandaue City Hall Post Office",
                                                "Mandaue City Hall",
                                                "Gaisano Grand Mall Mandaue",
                                                "A Del Rosario Street",
                                                "Colegio de la Inmaculada Concepcion Mandaue",
                                                "Coca-Cola",
                                                "Mandaue City SM JMall",
                                                "The Orchard Cebu Hotel and Suites",
                                                "Benedicto College",
                                                "Allure Hotel and Suites",
                                                "Oftana Suites",
                                                "Cebu Home and Builders Centre",
                                                "Banilad Town Center",
                                                "Gaisano Country Mall"),
                                13.0,
                                "Route from New Mandaue Public Market through AS Fortuna to Banilad Town Center and Gaisano Country Mall."));

                // 23D – Parkmall to Opon
                PUJS.add(new PujRoute(
                                "23D",
                                "Parkmall",
                                "Lapu Lapu City PUJ Terminal",
                                "Parkmall, Mandaue city proper, Opon",
                                Arrays.asList(
                                                "Parkmall",
                                                "S&R Membership Shopping",
                                                "Cebu Doctors University Hospital", // as given
                                                "St James Amusement Park",
                                                "Mandaue City Sports and Cultural Complex",
                                                "Bureau of Internal Revenue (BIR)",
                                                "New Mandaue Public Market",
                                                "Mandaue City Hospital",
                                                "Norkis Park",
                                                "Mandaue City Central School",
                                                "University of Visayas",
                                                "Hotel Nenita",
                                                "University of Cebu",
                                                "Mantawe Road",
                                                "Ompad Street",
                                                "La Nueva Supermarket Lapu Lapu",
                                                "Super Metro Gaisano Lapu-Lapu",
                                                "Lapu Lapu City PUJ Terminal"),
                                13.0,
                                "Route from Parkmall through Mandaue city proper to the Opon/Lapu-Lapu PUJ terminal."));

                // 62B – Pit-os to Carbon
                PUJS.add(new PujRoute(
                                "62B",
                                "Pitos",
                                "Carbon Public Market",
                                "Pit-os, Banilad, Ayala, Colon, Carbon",
                                Arrays.asList(
                                                "Pitos",
                                                "Bacayan",
                                                "Smeag Sparta",
                                                "Pelish English School",
                                                "Gaisano Grand Mall",
                                                "Aicila Suites Hotel",
                                                "USC",
                                                "Gaisano Country Mall",
                                                "University of Cebu Banilad Campus",
                                                "Paradise Village Road",
                                                "Cebu Country Club",
                                                "Samantabhadra Institute",
                                                "San Carlos Seminary Complex",
                                                "Keppel Tower Cebu Business Park",
                                                "Ayala Center Cebu",
                                                "Hotel Elizabeth Cebu",
                                                "Asilo De La Milagrosa",
                                                "Colegio de la Inmaculada Concepcion",
                                                "Gen Echavez Street",
                                                "Allsons Inn",
                                                "Sikatuna Street",
                                                "Colon Obelisk",
                                                "Vicente Gullas Street",
                                                "Dionisio Jakosalem Street",
                                                "Legaspi Street",
                                                "Progreso Street",
                                                "Carbon Public Market"),
                                13.0,
                                "Long route from Pit-os through Banilad and Ayala down to Colon and Carbon Public Market."));

                // MI-01A – Mactan to Punta Engaño
                PUJS.add(new PujRoute(
                                "MI-01A",
                                "Ompad Street",
                                "Punta Engano Elementary and High School",
                                "Opon, Mactan Marina, Punta Engano",
                                Arrays.asList(
                                                "Ompad Street",
                                                "La Nueva Supermarket",
                                                "Super Metro Gaisano Lapu-Lapu",
                                                "Lapu Lapu City PUJ Terminal",
                                                "PLDT Mactan",
                                                "Gaisano Mactan",
                                                "Goldberry Suites and Hotel",
                                                "Mactan Marina Mall",
                                                "Savemore",
                                                "Ibo Elementary School",
                                                "EMD Carmelite School",
                                                "Mactan Shrine",
                                                "Mares Philippines",
                                                "Movenpick Hotel Mactan Island Cebu",
                                                "AITI Native Center",
                                                "Be Resorts Mactan",
                                                "Cebu Sea World",
                                                "Punta Engano Elementary and High School"),
                                13.0,
                                "Route from Opon town area through Mactan Marina to the Punta Engano resort strip."));

                // MI-02B – Mandaue to Parkmall
                PUJS.add(new PujRoute(
                                "MI-02B",
                                "Kosmos Furniture Designs Philippines Inc",
                                "Parkmall",
                                "Mandaue city proper to Parkmall",
                                Arrays.asList(
                                                "Kosmos Furniture Designs Philippines Inc",
                                                "Bridges Town Square",
                                                "Tita Gwapa",
                                                "Hotel Nenita",
                                                "Grand Arcade Building",
                                                "Mandaue Coliseum",
                                                "STI College",
                                                "Colegio de la Inmaculada Concepcion Mandaue",
                                                "Hall of Justice",
                                                "Parkmall"),
                                13.0,
                                "Short connector from Mandaue city proper to Parkmall."));

                // MI-03A – Cordova to Lapu-Lapu
                PUJS.add(new PujRoute(
                                "MI-03A",
                                "Cordova",
                                "Lapu Lapu City Public Market",
                                "Cordova, Babag, Opon town",
                                Arrays.asList(
                                                "Cordova",
                                                "Señor San Roque Parish Church",
                                                "Cordova Academy Cooperative School",
                                                "Cordova Municipal Hall",
                                                "Quezon National Hwy",
                                                "Babang II Road",
                                                "Cattleya Gardens and Memorial Park",
                                                "Pilipog Elementary School",
                                                "Takan Public Market Park",
                                                "Sr Santo Nino Chapel",
                                                "Babag 2 Elementary School",
                                                "Mother of Perpetual Help Parish",
                                                "Babag Night High School",
                                                "Babag National High School",
                                                "Babag Elementary School",
                                                "Maria Ernestine School",
                                                "Tojong Hospital",
                                                "Lapu Lapu City Central School",
                                                "Opon Kindergarten and Nursery School",
                                                "Lapu Lapu City Public Market"),
                                13.0,
                                "Route from Cordova through Babag area to the Lapu-Lapu city public market."));

                // MI-03B – Mactan to Cordova
                PUJS.add(new PujRoute(
                                "MI-03B",
                                "MEPZ1 2nd Ave Road",
                                "Sr Santo Nino Chapel",
                                "Mactan Export Zone, Opon town, Cordova",
                                Arrays.asList(
                                                "MEPZ1 2nd Ave Road",
                                                "Savemore",
                                                "Mactan Marina Mall",
                                                "The Bellavista Hotel",
                                                "Gaisano Mactan",
                                                "PLDT Mactan",
                                                "Lapu Lapu City PUJ Terminal",
                                                "Super Metro Gaisano Lapu-Lapu",
                                                "Mantawe Road",
                                                "BM Dimataga Street",
                                                "Opon Plaza",
                                                "Our Lady of the Rule Parish Church",
                                                "Eastern Christian School",
                                                "Lapu Lapu City Central School",
                                                "Tojong Hospital",
                                                "Takan Public Market Park",
                                                "Pilipog Elementary School",
                                                "Cattleya Gardens and Memorial Park",
                                                "Babang II Road",
                                                "Cordova Central School",
                                                "Cordova Municipal Hall",
                                                "Cordova Academy Cooperative School",
                                                "Señor San Roque Parish Church",
                                                "Cordova",
                                                "Tojong Hospital",
                                                "Maria Ernestine School",
                                                "Babag Elementary School",
                                                "Babag National High School",
                                                "Babag Night High School",
                                                "Mother of Perpetual Help Parish",
                                                "Babag 2 Elementary School",
                                                "Sr Santo Nino Chapel"),
                                13.0,
                                "Loop route from MEPZ1 through Opon town and Cordova, terminating at Sr Santo Nino Chapel."));

                // MI-04A – Mactan to Tamiya
                PUJS.add(new PujRoute(
                                "MI-04A",
                                "SM JMall",
                                "Tamiya Terminal",
                                "SM JMall, Mactan access, MEZ II",
                                Arrays.asList(
                                                "SM JMall",
                                                "Savemore",
                                                "STI College",
                                                "Mandaue Coliseum",
                                                "Hotel Nenita",
                                                "University of Cebu",
                                                "Phoenix Publishing House",
                                                "Crown Regency Hotel",
                                                "Pueblo Verde Terminal",
                                                "Tamiya Terminal"),
                                13.0,
                                "Route from SM JMall area to the Tamiya terminal via Mactan access road."));

                // MI-04B – Mactan to MEPZ2
                PUJS.add(new PujRoute(
                                "MI-04B",
                                "MEPZ1 2nd Ave Road",
                                "Tamiya Terminal",
                                "MEPZ1, Mactan Marina, MEZ II",
                                Arrays.asList(
                                                "MEPZ1 2nd Ave Road",
                                                "Savemore",
                                                "Mactan Marina Mall",
                                                "The Bellavista Hotel",
                                                "Gaisano Mactan",
                                                "PLDT Mactan",
                                                "Phoenix Publishing House",
                                                "Crown Regency Hotel",
                                                "Robinsons Supermarket",
                                                "Tamiya Terminal"),
                                13.0,
                                "Route between MEPZ1 area and Tamiya/MEPZ2 via Mactan Marina corridor."));

                // MI-05A – Mactan to Opon
                PUJS.add(new PujRoute(
                                "MI-05A",
                                "Mactan Cebu International Airport",
                                "Cebu Mactan Ferry Terminal",
                                "Airport, Mactan Marina, Opon port",
                                Arrays.asList(
                                                "Mactan Cebu International Airport",
                                                "Timex Philippines Incorporated",
                                                "The Bellavista Hotel",
                                                "Gaisano Mactan",
                                                "PLDT Mactan",
                                                "Lapu Lapu City PUJ Terminal",
                                                "Super Metro Gaisano Lapu-Lapu",
                                                "Mantawe Road",
                                                "BM Dimataga Street",
                                                "Opon Plaza",
                                                "Cebu Mactan Ferry Terminal"),
                                13.0,
                                "Route from Mactan Cebu International Airport to the Opon ferry terminal via Mactan Marina."));
        }

        public static PujRoute getByCode(String code) {
                return PUJS.stream()
                                .filter(p -> p.getCode().equalsIgnoreCase(code))
                                .findFirst()
                                .orElse(null);
        }
}