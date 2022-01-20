package com.phouthasak.webapp.basketballCheckin.security;

import com.phouthasak.webapp.basketballCheckin.entity.UserPo;
import com.phouthasak.webapp.basketballCheckin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(final String username) {
        final UserPo user = userRepository.findByUserName(username);

        if (user == null) throw new UsernameNotFoundException(username);
        return new UserPrincipal(user);
    }
}
