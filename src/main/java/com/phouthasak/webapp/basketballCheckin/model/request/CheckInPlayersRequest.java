package com.phouthasak.webapp.basketballCheckin.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CheckInPlayersRequest {
    private List<PlayerCheckInRequest> playerCheckIn;
    private List<NonPlayerCheckInRequest> nonPlayerCheckIns;

    @NotEmpty(message = "Check In By cannot be empty")
    @NotNull(message = "Check In By cannot be null")
    private String checkInBy;

    @NotEmpty(message = "Event id cannot be empty")
    @NotNull(message = "Event id cannot be null")
    private Integer eventId;

    @NotEmpty(message = "Check in date cannot be empty")
    @NotNull(message = "Check in date cannot be null")
    private Date checkInDate;
}
