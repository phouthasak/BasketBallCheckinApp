package com.phouthasak.webapp.basketballCheckin.repository;

import com.phouthasak.webapp.basketballCheckin.entity.UserPo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserPo, Integer> {
    UserPo findById(String id);
    UserPo findByEmail(String email);
    UserPo findByUserName(String userName);
}
