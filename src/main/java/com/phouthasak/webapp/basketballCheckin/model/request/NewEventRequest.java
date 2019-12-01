package com.phouthasak.webapp.basketballCheckin.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NewEventRequest {
    private String location;
    private Integer courtNumber;
    private Date eventTime;
    private String createdBy;
}
