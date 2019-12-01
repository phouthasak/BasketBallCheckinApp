package com.phouthasak.webapp.basketballCheckin.controller;

import com.phouthasak.webapp.basketballCheckin.service.CheckinServices;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CheckInController {
    @Autowired
    private CheckinServices checkinServices;

    @ApiOperation(value = "Get a list of all the ballers", response = List.class)
    @GetMapping("/getBallers")
    public ResponseEntity getBallers() {
        return checkinServices.getBallers();
    }

    @ApiOperation(value = "Get a list of all the events", response = List.class)
    @GetMapping("/getEvents")
    public ResponseEntity getEvents() {
        return checkinServices.getEvents();
    }
}
