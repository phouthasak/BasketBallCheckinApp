package com.phouthasak.webapp.basketballCheckin.controller;

import com.phouthasak.webapp.basketballCheckin.model.request.NewPlayerRequest;
import com.phouthasak.webapp.basketballCheckin.service.CheckinServices;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PlayerController {
    @Autowired
    private CheckinServices checkinServices;

    @ApiOperation(value = "Get a list of all the registered players", response = List.class)
    @GetMapping("/player/getPlayers")
    public ResponseEntity getPlayers() {
        return checkinServices.getPlayers();
    }

    @ApiOperation(value = "Create a new player")
    @PostMapping("/player/createPlayer")
    public ResponseEntity createPlayer(@Valid @RequestBody NewPlayerRequest newPlayerRequest) {
        return checkinServices.createPlayer(newPlayerRequest);
    }
}
