package com.phouthasak.webapp.basketballCheckin.controller.helper;

import com.phouthasak.webapp.basketballCheckin.dto.UserDto;
import com.phouthasak.webapp.basketballCheckin.entity.UserPo;
import com.phouthasak.webapp.basketballCheckin.exception.InvalidException;
import com.phouthasak.webapp.basketballCheckin.repository.UserRepository;
import com.phouthasak.webapp.basketballCheckin.security.UserPrincipal;
import com.phouthasak.webapp.basketballCheckin.util.CustomEmailValidator;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class UserHelper {
    @Autowired
    private UserRepository userRepository;

    public void validateUserCreation(UserDto userDto) {
        if (userDto == null) return;

        if (CustomEmailValidator.validateEmail(userDto.getEmail())) {
            throw new InvalidException("invalid_email");
        }

        UserPo userPo = userRepository.findByUserNameOrEmail(userDto.getUserName(), userDto.getEmail());

        if (userPo != null) {
            throw new InvalidException("user_already_exist");
        }
    }

    public boolean checkUserAccess(UserPrincipal userPrincipal) {
        if (userPrincipal == null || userPrincipal.getUser() == null) return false;
        return userPrincipal.isAdmin();
    }

    public UserDto sanitizeUser(UserDto userDto) {
        if (userDto == null) return null;
        userDto.setPassword(null);
        return userDto;
    }

    public void convertEmailToLowerCase(UserDto userDto) {
        if (userDto == null) return;

        if (StringUtils.isNotBlank(userDto.getEmail())) {
            userDto.setEmail(userDto.getEmail().trim().toLowerCase());
        }
    }
}
