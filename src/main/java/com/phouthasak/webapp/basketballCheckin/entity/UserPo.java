package com.phouthasak.webapp.basketballCheckin.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserPo implements Serializable {
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

    @Basic(optional = false)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name ="created_date", insertable = false, updatable = false)
    private Date createdDate;

    @Basic(optional = false)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name ="modified_date", insertable = false, updatable = false)
    private Date modifiedDate;
}
