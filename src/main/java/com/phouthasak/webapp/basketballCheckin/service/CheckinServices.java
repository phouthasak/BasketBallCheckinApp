package com.phouthasak.webapp.basketballCheckin.service;

import com.phouthasak.webapp.basketballCheckin.entity.Audit;
import com.phouthasak.webapp.basketballCheckin.entity.Event;
import com.phouthasak.webapp.basketballCheckin.entity.Player;
import com.phouthasak.webapp.basketballCheckin.model.request.NewEventRequest;
import com.phouthasak.webapp.basketballCheckin.model.request.NewPlayerRequest;
import com.phouthasak.webapp.basketballCheckin.model.response.ErrorResponse;
import com.phouthasak.webapp.basketballCheckin.repository.AuditRepository;
import com.phouthasak.webapp.basketballCheckin.repository.EventRepository;
import com.phouthasak.webapp.basketballCheckin.repository.PlayerRepository;
import com.phouthasak.webapp.basketballCheckin.util.Constants;
import com.phouthasak.webapp.basketballCheckin.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class CheckinServices {
    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private AuditRepository auditRepository;

    @Autowired
    private Util util;

    public ResponseEntity getPlayers() {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("players", playerRepository.findAllByActiveTrue());
        return new ResponseEntity(responseMap, HttpStatus.OK);
    }

    public ResponseEntity createPlayer(NewPlayerRequest newPlayerRequest) {
        Player newPlayer = util.fillNewPlayer(newPlayerRequest);
        playerRepository.saveAndFlush(newPlayer);

        if (newPlayer.getPlayerId() != 0) {
            String newPlayerName = newPlayerRequest.getFirstName() + " " + newPlayerRequest.getMiddleName() + " " + newPlayerRequest.getLastName();
            insertLog(Constants.AUDIT_ACTION_TYPE_CREATE_PLAYER, String.format("Player: %s", newPlayerName), newPlayerRequest.getCreatedBy());
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("playerId", newPlayer.getPlayerId());
            responseMap.put("firstName", newPlayer.getFirstName());
            responseMap.put("lastName", newPlayer.getLastName());
            return new ResponseEntity(responseMap, HttpStatus.OK);
        } else {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setMessage("Error in creating player " + newPlayerRequest.getFirstName() + " " + newPlayerRequest.getLastName());
            return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity getEvents() {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("events", eventRepository.findAllByActiveTrue());
        return new ResponseEntity(responseMap, HttpStatus.OK);
    }

    public ResponseEntity createEvent(NewEventRequest newEventRequest) {
        try {
            Event event = new Event();
            event.setLocation(newEventRequest.getLocation());
            event.setCourtNumber(newEventRequest.getCourtNumber());
            event.setEventTime(newEventRequest.getEventTime());
            event.setCreatedDate(new Date());
            event.setCreatedBy(newEventRequest.getCreatedBy());
            event.setUpdatedDate(new Date());
            event.setUpdatedBy(newEventRequest.getCreatedBy());
            event.setActive(true);

            eventRepository.saveAndFlush(event);

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("eventId", event.getEventId());
            return new ResponseEntity(responseMap, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setMessage("Error Occur while trying to create new event");
            return new ResponseEntity(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void insertLog(String actionType, String description, String createdBy) {
        Audit audit = new Audit();
        audit.setActionType(actionType);
        audit.setDescription(description);
        audit.setCreatedDate(new Date());
        audit.setCreatedBy(createdBy);
        audit.setActive(true);

        auditRepository.saveAndFlush(audit);
    }
}
