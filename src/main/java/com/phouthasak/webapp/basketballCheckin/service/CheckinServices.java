package com.phouthasak.webapp.basketballCheckin.service;

import com.phouthasak.webapp.basketballCheckin.entity.*;
import com.phouthasak.webapp.basketballCheckin.model.request.*;
import com.phouthasak.webapp.basketballCheckin.model.response.ErrorResponse;
import com.phouthasak.webapp.basketballCheckin.repository.*;
import com.phouthasak.webapp.basketballCheckin.util.Constants;
import com.phouthasak.webapp.basketballCheckin.util.Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@Slf4j
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
    private PlayerCheckInRepository playerCheckInRepository;

    @Autowired
    private NonPlayerCheckInRepository nonPlayerCheckInRepository;

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

    public ResponseEntity getEventById(Integer eventId) {
        Optional<Event> event = eventRepository.findByEventIdAndActiveTrue(eventId);
        Map<String, Object> responseMap = new HashMap<>();
        if (event.isPresent()) {
            List<PlayerCheckIn> playerCheckIns = playerCheckInRepository.findAllByEventIdAndActiveTrue(eventId);
            List<NonPlayerCheckIn> nonPlayerCheckIns = nonPlayerCheckInRepository.findAllByEventIdAndActiveTrue(eventId);
            log.info("Event Id " + eventId + " have been found!!!");
            log.info("Player Checked In: " + playerCheckIns);
            log.info("Non Player Checked In: " + nonPlayerCheckIns);
            responseMap.put("event", event.get());
            responseMap.put("playerCheckIns", playerCheckIns);
            responseMap.put("nonPlayerCheckIns", nonPlayerCheckIns);
        } else {
            responseMap.put("event", null);
        }

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

    public ResponseEntity deleteEvent(DeleteEventRequest deleteEventRequest) {
        Optional<Event> event = eventRepository.findByEventIdAndActiveTrue(deleteEventRequest.getEventId());
        ErrorResponse errorResponse = new ErrorResponse();
        try{
            if (event.isPresent()) {
                Event updatedEvent = event.get();
                updatedEvent.setActive(false);
                eventRepository.saveAndFlush(updatedEvent);

                insertLog(Constants.AUDIT_ACTION_TYPE_EVENT_DELETE, "Event " + deleteEventRequest.getEventId() + " Deleted", deleteEventRequest.getDeletedBy());
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("event", deleteEventRequest);
                return new ResponseEntity(responseMap, HttpStatus.OK);
            } else {
                errorResponse.setMessage("Event id not found: " + deleteEventRequest.getEventId());
                return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            errorResponse.setMessage("Error on deleting event id: " + deleteEventRequest.getEventId());
            return new ResponseEntity(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity checkInPlayers(CheckInPlayersRequest checkInPlayersRequest) {
        Optional<Event> event = eventRepository.findByEventIdAndActiveTrue(checkInPlayersRequest.getEventId());
        ErrorResponse errorResponse = new ErrorResponse();
        if (event.isPresent()) {
            // If users provide a check in id from request, system will updated that check in,
            // else a new check in will be created

            List<PlayerCheckIn> playerCheckIns = util.fillPlayerCheckIn(
                    checkInPlayersRequest.getPlayerCheckIns(),
                    checkInPlayersRequest.getEventId(),
                    checkInPlayersRequest.getCheckInBy(),
                    checkInPlayersRequest.getCheckInDate());

            List<NonPlayerCheckIn> nonPlayerCheckIns = util.fillNonPlayerCheckIn(
                    checkInPlayersRequest.getNonPlayerCheckIns(),
                    checkInPlayersRequest.getEventId(),
                    checkInPlayersRequest.getCheckInBy(),
                    checkInPlayersRequest.getCheckInDate());

            List<Audit> playerCheckInLogs = util.createPlayerCheckInLogs(
                    new ArrayList<>(),
                    checkInPlayersRequest.getPlayerCheckIns(),
                    checkInPlayersRequest.getEventId(),
                    checkInPlayersRequest.getCheckInDate(),
                    checkInPlayersRequest.getCheckInBy());

            playerCheckInLogs = util.createNonPlayerCheckInLogs(
                    playerCheckInLogs,
                    checkInPlayersRequest.getNonPlayerCheckIns(),
                    checkInPlayersRequest.getEventId(),
                    checkInPlayersRequest.getCheckInDate(),
                    checkInPlayersRequest.getCheckInBy());

            playerCheckInRepository.saveAll(playerCheckIns);
            playerCheckInRepository.flush();
            nonPlayerCheckInRepository.saveAll(nonPlayerCheckIns);
            nonPlayerCheckInRepository.flush();
            auditRepository.saveAll(playerCheckInLogs);
            auditRepository.flush();

            log.info("Player Check In Updated: " + playerCheckIns.size());
            log.info("NonPlayer Check In Updated: " + nonPlayerCheckIns.size());

            return getEventById(checkInPlayersRequest.getEventId());
        } else {
            errorResponse.setMessage("Event could not be found");
            return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
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
