package com.phouthasak.webapp.basketballCheckin.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Test {
    public static void main(String[] args){
        try {
            String time = "10:57:00 PM";
            String date = "12/1/2019";
            String trueDate = date + " " + time;
            SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss aa");
            Date date1 = formatter.parse(trueDate);
            System.out.println(date1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
