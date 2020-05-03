package com.phouthasak.webapp.basketballCheckin.util;

import com.phouthasak.webapp.basketballCheckin.entity.Player;
import com.phouthasak.webapp.basketballCheckin.model.request.NewPlayerRequest;
import org.springframework.stereotype.Component;

import java.util.Date;

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
}
