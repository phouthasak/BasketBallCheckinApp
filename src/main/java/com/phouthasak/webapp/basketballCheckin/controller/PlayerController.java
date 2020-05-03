package com.phouthasak.webapp.basketballCheckin.controller;

import com.phouthasak.webapp.basketballCheckin.model.request.NewEventRequest;
import com.phouthasak.webapp.basketballCheckin.model.request.NewPlayerRequest;
import com.phouthasak.webapp.basketballCheckin.service.CheckinServices;
import io.swagger.annotations.ApiOperation;
import javafx.beans.binding.ObjectExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PlayerController {
    @Autowired
    private CheckinServices checkinServices;

    @ApiOperation(value = "Get a list of all the ballers", response = List.class)
    @GetMapping("/player/getPlayers")
    public ResponseEntity getPlayers() {
        return checkinServices.getPlayers();
    }

    @PostMapping("/player/createPlayer")
    public ResponseEntity createPlayer(@Valid @RequestBody NewPlayerRequest newPlayerRequest) {
        return checkinServices.createPlayer(newPlayerRequest);
    }

    @ApiOperation(value = "Get a list of all the events", response = List.class)
    @GetMapping("/event/getEvents")
    public ResponseEntity getEvents() {
        return checkinServices.getEvents();
    }

    @ApiOperation(value = "Create a new event")
    @PostMapping("/event/createEvent")
    public ResponseEntity createEvent(@RequestBody NewEventRequest newEventRequest) {
        return checkinServices.createEvent(newEventRequest);
    }
}
