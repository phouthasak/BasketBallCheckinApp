package com.phouthasak.webapp.basketballCheckin.service;

import com.phouthasak.webapp.basketballCheckin.entity.Event;
import com.phouthasak.webapp.basketballCheckin.model.request.NewEventRequest;
import com.phouthasak.webapp.basketballCheckin.model.response.ErrorResponse;
import com.phouthasak.webapp.basketballCheckin.repository.BallerRepository;
import com.phouthasak.webapp.basketballCheckin.repository.EventRepository;
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
}
