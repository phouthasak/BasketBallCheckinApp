package com.phouthasak.webapp.basketballCheckin.service;

import com.phouthasak.webapp.basketballCheckin.repository.BallerRepository;
import com.phouthasak.webapp.basketballCheckin.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CheckinServices {
    @Autowired
    private BallerRepository ballerRepository;

    @Autowired
    private EventRepository eventRepository;

    public ResponseEntity getBallers() {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("ballers", ballerRepository.findAllByActiveTrue());
        return new ResponseEntity(responseMap, HttpStatus.OK);
    }

    public ResponseEntity getEvents() {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("events", eventRepository.findAllByActiveTrue());
        return new ResponseEntity(responseMap, HttpStatus.OK);
    }
}
