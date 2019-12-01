package com.phouthasak.webapp.basketballCheckin.controller;

import com.phouthasak.webapp.basketballCheckin.service.CheckinServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CheckInController {
    @Autowired
    private CheckinServices checkinServices;

    @GetMapping("/getBallers")
    public ResponseEntity getBallers() {
        return checkinServices.getBallers();
    }
}
