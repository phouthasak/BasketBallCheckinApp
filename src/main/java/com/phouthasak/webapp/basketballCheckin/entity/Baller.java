package com.phouthasak.webapp.basketballCheckin.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "BALLER")
@Getter
@Setter
public class Baller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "baller_id")
    private int ballerId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @JsonIgnore
    @Column(name = "created_date")
    private Date createdDate;

    @JsonIgnore
    @Column(name = "created_by")
    private String createdBy;

    @JsonIgnore
    @Column(name = "updated_date")
    private Date updatedDate;

    @JsonIgnore
    @Column(name = "updated_by")
    private String updatedBy;

    @JsonIgnore
    @Column(name = "active")
    private Boolean active;
}
