package com.phouthasak.webapp.basketballCheckin.repository;

import com.phouthasak.webapp.basketballCheckin.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findTop10ByActiveTrueOrderByCreatedDateDesc();
    Optional<Event> findByEventIdAndActiveTrue(Integer id);
}
