package com.phouthasak.webapp.basketballCheckin.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class PlayerCheckInRequest {
    private Optional<Integer> checkInId;
    private Integer playerId;
    private Boolean checkInStatus;
}
