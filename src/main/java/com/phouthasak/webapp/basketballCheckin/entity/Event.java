package com.phouthasak.webapp.basketballCheckin.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "EVENTS")
@Setter
@Getter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int eventId;

    @JsonIgnore
    @Column(name = "location_id")
    private Integer locationId;

    @OneToOne
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", insertable = false, updatable = false)
    private Location location;

    @Column(name = "court_number")
    private Integer courtNumber;

    @Column(name = "event_date_time")
    private Date eventDateTime;

    @Column(name = "scheduled")
    private Boolean scheduled;

    @Column(name = "permit")
    private byte[] permit;

    @Column(name = "permit_file_name")
    private String permitFileName;

    @JsonIgnore
    @Column(name = "host_id")
    private Integer hostId;

    @OneToOne
    @JoinColumn(name = "host_id", referencedColumnName = "player_id", insertable = false, updatable = false)
    private Player player;

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
