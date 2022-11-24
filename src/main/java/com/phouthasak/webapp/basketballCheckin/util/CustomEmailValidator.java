package com.phouthasak.webapp.basketballCheckin.util;

import org.apache.commons.lang3.StringUtils;

import java.util.regex.Pattern;

public class CustomEmailValidator {
    private static final String REGX_EMAIL = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    private static final Pattern PATTERN_EMAIL = Pattern.compile(REGX_EMAIL);


    public static boolean validateEmail(String email) {
        return !StringUtils.isBlank(email) && !PATTERN_EMAIL.matcher(email).matches();
    }
}
