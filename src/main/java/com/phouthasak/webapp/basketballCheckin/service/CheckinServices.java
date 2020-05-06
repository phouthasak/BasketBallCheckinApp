package com.phouthasak.webapp.basketballCheckin.service;

import com.phouthasak.webapp.basketballCheckin.entity.Audit;
import com.phouthasak.webapp.basketballCheckin.entity.Event;
import com.phouthasak.webapp.basketballCheckin.entity.Player;
import com.phouthasak.webapp.basketballCheckin.model.request.NewPlayerRequest;
import com.phouthasak.webapp.basketballCheckin.model.response.ErrorResponse;
import com.phouthasak.webapp.basketballCheckin.repository.AuditRepository;
import com.phouthasak.webapp.basketballCheckin.repository.EventRepository;
import com.phouthasak.webapp.basketballCheckin.repository.LocationRepository;
import com.phouthasak.webapp.basketballCheckin.repository.PlayerRepository;
import com.phouthasak.webapp.basketballCheckin.util.Constants;
import com.phouthasak.webapp.basketballCheckin.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CheckinServices {
    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private AuditRepository auditRepository;

    @Autowired
    private LocationRepository locationRepository;

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

    public ResponseEntity getLocations() {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("locations", locationRepository.findAllByActiveTrueOrderByLocationName());
        return new ResponseEntity(responseMap, HttpStatus.OK);
    }

    public ResponseEntity getEvents() {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("events", eventRepository.findTop10ByActiveTrueOrderByCreatedDateDesc());
        return new ResponseEntity(responseMap, HttpStatus.OK);
    }

    public ResponseEntity createEvent(Integer locationId, Integer courtNumber, Date eventTime, Boolean scheduled, Optional<MultipartFile> permit, Optional<String> permitFileName, Integer hostId) {
        try {
            Player player = playerRepository.findByPlayerIdAndActiveTrue(hostId);
            String playerName = player.getFirstName() + " " + player.getLastName();
            Event event = new Event();
            event.setLocationId(locationId);
            event.setCourtNumber(courtNumber);
            event.setEventDateTime(eventTime);
            event.setScheduled(scheduled);

            if (permit.isPresent() && permitFileName.isPresent()) {
                event.setPermit(permit.get().getBytes());
                event.setPermitFileName(permitFileName.get());
            }

            event.setHostId(hostId);
            event.setCreatedBy(playerName);
            event.setCreatedDate(new Date());
            event.setUpdatedBy(playerName);
            event.setUpdatedDate(new Date());
            event.setActive(true);
            eventRepository.saveAndFlush(event);

            if (event.getEventId() != 0) {
                insertLog(Constants.AUDIT_ACTION_TYPE_CREATE_EVENT, "Created event " + event.getEventId(), playerName);
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("eventId", event.getEventId());
                return new ResponseEntity(responseMap, HttpStatus.OK);
            } else {
                ErrorResponse errorResponse = new ErrorResponse();
                errorResponse.setMessage("Error saving event");
                return new ResponseEntity(errorResponse, HttpStatus.OK);
            }
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
