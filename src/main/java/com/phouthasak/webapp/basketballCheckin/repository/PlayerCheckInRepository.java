package com.phouthasak.webapp.basketballCheckin.repository;

import com.phouthasak.webapp.basketballCheckin.entity.PlayerCheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerCheckInRepository extends JpaRepository<PlayerCheckIn, Integer> {
    List<PlayerCheckIn> findAllByEventIdAndActiveTrue(Integer id);
}
