package com.phouthasak.webapp.basketballCheckin.repository;

import com.phouthasak.webapp.basketballCheckin.entity.Baller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BallerRepository extends JpaRepository<Baller, Integer> {
    List<Baller> findAllByActiveTrue();
}
