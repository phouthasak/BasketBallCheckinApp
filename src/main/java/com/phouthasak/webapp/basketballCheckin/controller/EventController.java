//package com.phouthasak.webapp.basketballCheckin.controller;
//
//import com.phouthasak.webapp.basketballCheckin.entity.Event;
//import com.phouthasak.webapp.basketballCheckin.model.request.CheckInPlayersRequest;
//import com.phouthasak.webapp.basketballCheckin.model.request.DeleteEventRequest;
//import com.phouthasak.webapp.basketballCheckin.service.CheckinServices;
//import io.swagger.annotations.ApiOperation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.validation.constraints.NotEmpty;
//import javax.validation.constraints.NotNull;
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api")
//public class EventController {
//    @Autowired
//    private CheckinServices checkinServices;
//
//    @ApiOperation(value = "Get a list of the locations", response = List.class)
//    @GetMapping("/event/getLocations")
//    public ResponseEntity getLocations() {
//        return checkinServices.getLocations();
//    }
//
//    @ApiOperation(value = "Get a list of the last 10 events", response = List.class)
//    @GetMapping("/event/getEvents")
//    public ResponseEntity getEvents() {
//        return checkinServices.getEvents();
//    }
//
//    @ApiOperation(value = "Create a new event")
//    @PostMapping("/event/createEvent")
//    public ResponseEntity createEvent(@NotNull(message = "Location id can not be null")
//                                          @RequestParam("locationId") Integer locationId,
//                                      @NotNull(message = "Court number cannot be null") @RequestParam("courtNumber") Integer courtNumber,
//                                      @NotNull(message = "Event time cannot be null") @NotEmpty(message = "Event time cannot be empty") @RequestParam("eventTime") Date eventTime,
//                                      @NotNull(message = "Scheduled cannot be null") @RequestParam("scheduled") Boolean scheduled,
//                                      @RequestParam("permit") Optional<MultipartFile> permit,
//                                      @RequestParam("permitFileName") Optional<String> permitFileName,
//                                      @NotNull(message = "Host id cannot be null") @RequestParam("hostId") Integer hostId) {
//        return checkinServices.createEvent(locationId, courtNumber, eventTime, scheduled, permit, permitFileName, hostId);
//    }
//
//    @ApiOperation(value = "Get an event by id", response = Event.class)
//    @GetMapping("/event/getEvent")
//    public ResponseEntity getEvent(@RequestParam("eventId") Integer eventId) {
//        return checkinServices.getEventById(eventId);
//    }
//
//    @ApiOperation(value = "Check Players In")
//    @PostMapping("/event/checkIn")
//    public ResponseEntity checkPlayersIn(@RequestBody CheckInPlayersRequest checkInPlayersRequest) {
//        return checkinServices.checkInPlayers(checkInPlayersRequest);
//    }
//
//    @ApiOperation(value = "Delete an event")
//    @PostMapping("/event/deleteEvent")
//    public ResponseEntity deleteEvent(@RequestBody DeleteEventRequest deleteEventRequest) {
//        return checkinServices.deleteEvent(deleteEventRequest);
//    }
//}
