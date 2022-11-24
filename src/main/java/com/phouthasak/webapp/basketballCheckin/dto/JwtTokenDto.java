package com.phouthasak.webapp.basketballCheckin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class JwtTokenDto implements Serializable {
    private String token;
}
