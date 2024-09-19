package com.acme.interviews;

import java.util.*;
import com.opencsv.CSVReader;
import java.io.FileReader;
import java.io.IOException;

// The ‘FundingRaised’ class is doing multiple things (reading CSV, filtering data, handling exceptions, etc.), which makes it a large class with many responsibilities.
public class FundingRaised {
    // Long Method: Both where and findBy methods are relatively long and could be broken down into smaller, more manageable methods to improve readability and maintainability.
    public static List<Map<String, String>> where(Map<String, String> options) throws IOException {
        List<String[]> csvData = new ArrayList<String[]>();

        // Hardcoded File Name: The file name "startup_funding.csv" is hardcoded in multiple places. It's better to use a constant or a parameter to make the code more flexible and reusable.
        CSVReader reader = new CSVReader(new FileReader("startup_funding.csv"));
        String[] row = null;

        while((row = reader.readNext()) != null) {
            csvData.add(row);
        }

        reader.close();
        csvData.remove(0);

        // The code uses multiple loops to filter data based on different criteria (company name, city, state, round). 
        if(options.containsKey("company_name")) {
            List<String[]> results = new ArrayList<String[]> ();

            for(int i = 0; i < csvData.size(); i++) {
                if(csvData.get(i)[1].equals(options.get("company_name"))) {
                    results.add(csvData.get(i));
                }
            }
            csvData = results;
        }

        if(options.containsKey("city")) {
            List<String[]> results = new ArrayList<String[]> ();

            for(int i = 0; i < csvData.size(); i++) {
                //Magic Numbers: There are magic numbers in the code, such as array indices (e.g., csvData.get(i)[4]). Consider using named constants or enums to make the code more readable.
                if(csvData.get(i)[4].equals(options.get("city"))) {
                    results.add(csvData.get(i));
                }
            }
            csvData = results;
        }

        if(options.containsKey("state")) {
            List<String[]> results = new ArrayList<String[]> ();

            for(int i = 0; i < csvData.size(); i++) {
                if(csvData.get(i)[5].equals(options.get("state"))) {
                    results.add(csvData.get(i));
                }
            }
            csvData = results;
        }

        if(options.containsKey("round")) {
            List<String[]> results = new ArrayList<String[]> ();

            for(int i = 0; i < csvData.size(); i++) {
                if(csvData.get(i)[9].equals(options.get("round"))) {
                    results.add(csvData.get(i));
                }
            }
            csvData = results;
        }

        List<Map<String, String>> output = new ArrayList<Map<String, String>>();

        for(int i = 0; i < csvData.size(); i++) {
            Map<String, String> mapped = new HashMap<String, String> ();
            mapped.put("permalink", csvData.get(i)[0]);
            mapped.put("company_name", csvData.get(i)[1]);
            mapped.put("number_employees", csvData.get(i)[2]);
            mapped.put("category", csvData.get(i)[3]);
            mapped.put("city", csvData.get(i)[4]);
            mapped.put("state", csvData.get(i)[5]);
            mapped.put("funded_date", csvData.get(i)[6]);
            mapped.put("raised_amount", csvData.get(i)[7]);
            mapped.put("raised_currency", csvData.get(i)[8]);
            mapped.put("round", csvData.get(i)[9]);
            output.add(mapped);
        }

        return output;
    }

    public static Map<String, String> findBy(Map<String, String> options) throws IOException, NoSuchEntryException {
        List<String[]> csvData = new ArrayList<String[]>();
        CSVReader reader = new CSVReader(new FileReader("startup_funding.csv"));
        String[] row = null;

        // The code for reading the CSV file is repeated
        while((row = reader.readNext()) != null) {
            csvData.add(row);
        }

        reader.close();
        csvData.remove(0);
        Map<String, String> mapped = new HashMap<String, String> ();

        for(int i = 0; i < csvData.size(); i++) {
            if(options.containsKey("company_name")) {
                // The code uses multiple loops to filter data based on different criteria. It can be optimized by combining the filters within a single loop.
                if(csvData.get(i)[1].equals(options.get("company_name"))) {
                    mapped.put("permalink", csvData.get(i)[0]);
                    mapped.put("company_name", csvData.get(i)[1]);
                    mapped.put("number_employees", csvData.get(i)[2]);
                    mapped.put("category", csvData.get(i)[3]);
                    mapped.put("city", csvData.get(i)[4]);
                    mapped.put("state", csvData.get(i)[5]);
                    mapped.put("funded_date", csvData.get(i)[6]);
                    mapped.put("raised_amount", csvData.get(i)[7]);
                    mapped.put("raised_currency", csvData.get(i)[8]);
                    mapped.put("round", csvData.get(i)[9]);
                } else {
                    continue;
                }
            }
            
            if(options.containsKey("city")) {
                if(csvData.get(i)[4].equals(options.get("city"))) {
                    mapped.put("permalink", csvData.get(i)[0]);
                    mapped.put("company_name", csvData.get(i)[1]);
                    mapped.put("number_employees", csvData.get(i)[2]);
                    mapped.put("category", csvData.get(i)[3]);
                    mapped.put("city", csvData.get(i)[4]);
                    mapped.put("state", csvData.get(i)[5]);
                    mapped.put("funded_date", csvData.get(i)[6]);
                    mapped.put("raised_amount", csvData.get(i)[7]);
                    mapped.put("raised_currency", csvData.get(i)[8]);
                    mapped.put("round", csvData.get(i)[9]);
                } else {
                    continue;
                }
            }

            if(options.containsKey("state")) {
                if(csvData.get(i)[5].equals(options.get("state"))) {
                    mapped.put("permalink", csvData.get(i)[0]);
                    mapped.put("company_name", csvData.get(i)[1]);
                    mapped.put("number_employees", csvData.get(i)[2]);
                    mapped.put("category", csvData.get(i)[3]);
                    mapped.put("city", csvData.get(i)[4]);
                    mapped.put("state", csvData.get(i)[5]);
                    mapped.put("funded_date", csvData.get(i)[6]);
                    mapped.put("raised_amount", csvData.get(i)[7]);
                    mapped.put("raised_currency", csvData.get(i)[8]);
                    mapped.put("round", csvData.get(i)[9]);
                } else {
                    continue;
                }
            }

            if(options.containsKey("round")) {
                // 
                if(csvData.get(i)[9].equals(options.get("round"))) {
                    mapped.put("permalink", csvData.get(i)[0]);
                    mapped.put("company_name", csvData.get(i)[1]);
                    mapped.put("number_employees", csvData.get(i)[2]);
                    mapped.put("category", csvData.get(i)[3]);
                    mapped.put("city", csvData.get(i)[4]);
                    mapped.put("state", csvData.get(i)[5]);
                    mapped.put("funded_date", csvData.get(i)[6]);
                    mapped.put("raised_amount", csvData.get(i)[7]);
                    mapped.put("raised_currency", csvData.get(i)[8]);
                    mapped.put("round", csvData.get(i)[9]);
                } else {
                    continue;
                }
            }


            return mapped;
        }

        throw new NoSuchEntryException();
    }

    public static void main(String[] args) {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("company_name", "Facebook");
            options.put("round", "a");
            System.out.print(FundingRaised.where(options).size());
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }
}

// The NoSuchEntryException class is defined but not used
class NoSuchEntryException extends Exception {}
