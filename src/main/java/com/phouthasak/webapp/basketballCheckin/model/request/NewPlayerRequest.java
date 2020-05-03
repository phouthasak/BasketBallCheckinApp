package com.phouthasak.webapp.basketballCheckin.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class NewPlayerRequest {
    @Size(min = 1, message = "First name cannot be empty")
    @NotNull(message = "First name cannot be empty")
    private String firstName;

    private String middleName;

    @Size(min = 1, message = "First name cannot be empty")
    @NotNull(message = "Last bame cannot be empty")
    private String lastName;

    @Size(min = 1, message = "Creator cannot be empty")
    @NotNull(message = "Creator cannot be empty")
    private String createdBy;
}
