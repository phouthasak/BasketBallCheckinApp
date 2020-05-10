package com.phouthasak.webapp.basketballCheckin.repository;

import com.phouthasak.webapp.basketballCheckin.entity.NonPlayerCheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NonPlayerCheckInRepository extends JpaRepository<NonPlayerCheckIn, Integer> {
    List<NonPlayerCheckIn> findAllByEventIdAndActiveTrue(Integer id);
}
