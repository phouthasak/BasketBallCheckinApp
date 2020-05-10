package com.phouthasak.webapp.basketballCheckin.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class NonPlayerCheckInRequest {
    private Optional<Integer> checkInId;
    private Integer sponsorId;
    private String firstName;
    private String lastName;
    private Boolean checkInStatus;
}
