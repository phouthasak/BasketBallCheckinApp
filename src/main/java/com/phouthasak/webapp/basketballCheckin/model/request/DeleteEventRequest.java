package com.phouthasak.webapp.basketballCheckin.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class DeleteEventRequest {
    @NotNull(message = "Event id cannot be null")
    private Integer eventId;

    @Size(min = 1, message = "Deleted by cannot be empty")
    @NotNull(message = "Deleted by cannot be null")
    private String deletedBy;
}
