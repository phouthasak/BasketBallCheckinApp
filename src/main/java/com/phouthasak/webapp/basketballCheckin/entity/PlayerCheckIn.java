package com.phouthasak.webapp.basketballCheckin.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "PLAYER_CHECKIN")
@Setter
@Getter
public class PlayerCheckIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "checkIn_id")
    private int checkInId;

    @JsonIgnore
    @Column(name = "event_id")
    private Integer eventId;

    @JsonIgnore
    @Column(name = "player_id")
    private Integer playerId;

    @OneToOne
    @JoinColumn(name = "player_id", referencedColumnName = "player_id", insertable = false, updatable = false)
    private Player player;

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
