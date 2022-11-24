package com.phouthasak.webapp.basketballCheckin.service;

import com.phouthasak.webapp.basketballCheckin.dto.UserDto;
import com.phouthasak.webapp.basketballCheckin.entity.UserPo;
import com.phouthasak.webapp.basketballCheckin.repository.UserRepository;
import com.phouthasak.webapp.basketballCheckin.util.IdGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserManagerServiceImpl implements UserManagerService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        userDto.setId(IdGenerator.uuidBase64UrlSafe());
        UserPo userPo = UserPo.from(userDto);
        userPo.setAdmin(false);
        userPo.setEnabled(true);
        userPo.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userPo = userRepository.saveAndFlush(userPo);

        return UserDto.from(userPo);
    }


}
