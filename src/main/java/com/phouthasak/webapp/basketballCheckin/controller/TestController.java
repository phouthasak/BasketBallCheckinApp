package com.phouthasak.webapp.basketballCheckin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping("/test")
    public ResponseEntity test() {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("response", "hello world");
        return new ResponseEntity(responseMap, HttpStatus.OK);
    }
}
