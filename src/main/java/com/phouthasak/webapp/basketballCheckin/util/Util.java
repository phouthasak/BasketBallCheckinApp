package com.phouthasak.webapp.basketballCheckin.util;

import com.phouthasak.webapp.basketballCheckin.entity.Audit;
import com.phouthasak.webapp.basketballCheckin.entity.NonPlayerCheckIn;
import com.phouthasak.webapp.basketballCheckin.entity.Player;
import com.phouthasak.webapp.basketballCheckin.entity.PlayerCheckIn;
import com.phouthasak.webapp.basketballCheckin.model.request.NewPlayerRequest;
import com.phouthasak.webapp.basketballCheckin.model.request.NonPlayerCheckInRequest;
import com.phouthasak.webapp.basketballCheckin.model.request.PlayerCheckInRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class Util {
    public Player fillNewPlayer(NewPlayerRequest newPlayerRequest) {
        Player player = new Player();
        player.setFirstName(newPlayerRequest.getFirstName().trim());
        player.setLastName(newPlayerRequest.getLastName().trim());
        player.setMiddleName(newPlayerRequest.getMiddleName().trim());
        player.setCreatedDate(new Date());
        player.setCreatedBy(newPlayerRequest.getCreatedBy().trim());
        player.setUpdatedDate(new Date());
        player.setUpdatedBy(newPlayerRequest.getCreatedBy().trim());
        player.setActive(true);
        return player;
    }

    public List<PlayerCheckIn> fillPlayerCheckIn(List<PlayerCheckInRequest> requests, Integer eventId, String createdBy, Date date) {
        List<PlayerCheckIn> checkIns = new ArrayList<>();
        for (PlayerCheckInRequest request : requests) {
            PlayerCheckIn checkIn = new PlayerCheckIn();

            if (request.getCheckInId() != null && request.getCheckInId().isPresent()) {
                checkIn.setCheckInId(request.getCheckInId().get());
            }

            checkIn.setEventId(eventId);
            checkIn.setPlayerId(request.getPlayerId());
            checkIn.setCheckInStatus(request.getCheckInStatus());
            checkIn.setCreatedDate(date);
            checkIn.setCreatedBy(createdBy);
            checkIn.setUpdatedDate(date);
            checkIn.setUpdatedBy(createdBy);
            checkIn.setActive(true);
            checkIns.add(checkIn);
        }
        return checkIns;
    }

    public List<NonPlayerCheckIn> fillNonPlayerCheckIn(List<NonPlayerCheckInRequest> requests, Integer eventId, String createdBy, Date date) {
        List<NonPlayerCheckIn> checkIns = new ArrayList<>();
        for (NonPlayerCheckInRequest request : requests) {
            NonPlayerCheckIn checkIn = new NonPlayerCheckIn();

            if (request.getCheckInId() != null && request.getCheckInId().isPresent()) {
                checkIn.setCheckInId(request.getCheckInId().get());
            }

            checkIn.setEventId(eventId);
            checkIn.setSponsorId(request.getSponsorId());
            checkIn.setFirstName(request.getFirstName());
            checkIn.setLastName(request.getLastName());
            checkIn.setCheckInStatus(request.getCheckInStatus());
            checkIn.setCreatedDate(date);
            checkIn.setCreatedBy(createdBy);
            checkIn.setUpdatedDate(date);
            checkIn.setUpdatedBy(createdBy);
            checkIn.setActive(true);
            checkIns.add(checkIn);
        }
        return checkIns;
    }

    public List<Audit> createPlayerCheckInLogs(List<Audit> audits, List<PlayerCheckInRequest> requests, Integer eventId, Date date, String createdBy) {
        for (PlayerCheckInRequest request: requests) {
            Audit audit = new Audit();

            String description;
            if (request.getCheckInId() != null && request.getCheckInId().isPresent()) {
                audit.setActionType(Constants.AUDIT_ACTION_TYPE_PLAYER_CHECKIN_UPDATE);
                description = "CheckIn Id: " + request.getCheckInId().get().toString() + " | Event Id: " + eventId.toString() + " | Player: " + request.getPlayerId().toString() + " changed status to ->" + request.getCheckInStatus().toString();
            } else {
                audit.setActionType(Constants.AUDIT_ACTION_TYPE_PLAYER_CHECKIN_NEW);
                description = "Event Id: " + eventId.toString() + " | Player: " + request.getPlayerId().toString() + " changed status to ->" + request.getCheckInStatus().toString();
            }
            audit.setDescription(description);

            audit.setCreatedDate(date);
            audit.setCreatedBy(createdBy);
            audit.setActive(true);
            audits.add(audit);
        }
        return audits;
    }

    public List<Audit> createNonPlayerCheckInLogs(List<Audit> audits, List<NonPlayerCheckInRequest> requests, Integer eventId, Date date, String createdBy) {
        for (NonPlayerCheckInRequest request: requests) {
            Audit audit = new Audit();

            String description;
            if (request.getCheckInId() != null && request.getCheckInId().isPresent()) {
                audit.setActionType(Constants.AUDIT_ACTION_TYPE_NON_PLAYER_CHECKIN_UPDATE);
                description = "CheckIn Id: " + request.getCheckInId().get().toString() + " | Event Id: " + eventId.toString() + " | Sponsor: " + request.getSponsorId() +" | NonPlayer: " + request.getFirstName() + " " + request.getLastName() + " changed status to ->" + request.getCheckInStatus().toString();
            } else {
                audit.setActionType(Constants.AUDIT_ACTION_TYPE_NON_PLAYER_CHECKIN_NEW);
                description = "Event Id: " + eventId.toString() + " | Sponsor: " + request.getSponsorId() +" | NonPlayer: " + request.getFirstName() + " " + request.getLastName() + " changed status to ->" + request.getCheckInStatus().toString();
            }
            audit.setDescription(description);

            audit.setDescription("Event Id: " + eventId.toString() + " | Sponsor: " + request.getSponsorId() +" | NonPlayer: " + request.getFirstName() + " " + request.getLastName() + " changed status to ->" + request.getCheckInStatus().toString());
            audit.setCreatedDate(date);
            audit.setCreatedBy(createdBy);
            audit.setActive(true);
            audits.add(audit);
        }
        return audits;
    }
}
