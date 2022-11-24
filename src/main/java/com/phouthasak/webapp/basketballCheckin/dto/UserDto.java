package com.phouthasak.webapp.basketballCheckin.dto;

import com.phouthasak.webapp.basketballCheckin.entity.UserPo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
public class UserDto implements Serializable {
    private String id;

    @NotNull(message = "First Name is required")
    @Size(min = 1, message = "First Name cannot be empty")
    private String firstName;

    @NotNull(message = "Last Name is required")
    @Size(min = 1, message = "Last Name cannot be empty")
    private String lastName;

    @NotNull(message = "Email is required")
    @Size(min = 1, message = "Email cannot be empty")
    private String email;

    @NotNull(message = "User Name is required")
    @Size(min = 1, message = "User name cannot be empty")
    private String userName;

    @NotNull(message = "Password is required")
    @Size(min = 1, message = "Password cannot be empty")
    private String password;

    public static UserDto from(UserPo userPo) {
        if (userPo == null) return null;
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userPo, userDto);
        userDto.setPassword(null);
        return userDto;
    }
}
