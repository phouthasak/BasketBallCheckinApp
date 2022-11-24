package com.phouthasak.webapp.basketballCheckin.entity;

import com.phouthasak.webapp.basketballCheckin.dto.UserDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ja_user")
@Getter
@Setter
public class UserPo {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "admin")
    private boolean admin;

    @Basic(optional = false)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name ="created_date", insertable = false, updatable = false)
    private Date createdDate;

    @Basic(optional = false)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name ="modified_date", insertable = false, updatable = false)
    private Date modifiedDate;

    public static UserPo from(UserDto userDto) {
        if (userDto == null) return null;

        UserPo userPo = new UserPo();
        BeanUtils.copyProperties(userDto, userPo);

        return userPo;
    }
}
