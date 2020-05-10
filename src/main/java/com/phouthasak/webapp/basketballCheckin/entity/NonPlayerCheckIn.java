package com.phouthasak.webapp.basketballCheckin.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "NON_PLAYER_CHECKIN")
@Setter
@Getter
public class NonPlayerCheckIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "checkIn_id")
    private int checkInId;

    @JsonIgnore
    @Column(name = "event_id")
    private Integer eventId;

    @JsonIgnore
    @Column(name = "sponsor_id")
    private Integer sponsorId;

    @OneToOne
    @JoinColumn(name = "sponsor_id", referencedColumnName = "player_id", insertable = false, updatable = false)
    private Player sponsor;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "check_in_status")
    private Boolean checkInStatus;

    @JsonIgnore
    @Column(name = "created_date")
    private Date createdDate;

    @JsonIgnore
    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_date")
    private Date updatedDate;

    @Column(name = "updated_by")
    private String updatedBy;

    @JsonIgnore
    @Column(name = "active")
    private Boolean active;
}
