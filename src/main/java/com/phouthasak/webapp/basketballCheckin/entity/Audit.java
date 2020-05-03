package com.phouthasak.webapp.basketballCheckin.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "AUDIT")
@Getter
@Setter
public class Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "audit_id")
    private int auditId;

    @Column(name = "action_type")
    private String actionType;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @Column(name = "created_date")
    private Date createdDate;

    @JsonIgnore
    @Column(name = "created_by")
    private String createdBy;

    @JsonIgnore
    @Column(name = "active")
    private Boolean active;
}
