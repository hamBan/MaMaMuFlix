package com.mamamusflix.media_backend.service;

import com.mamamusflix.media_backend.model.UserPrincipal;
import com.mamamusflix.media_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.mamamusflix.media_backend.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByUsername(username);
        if(user == null) {
//            System.out.println("User not found in database!");
            throw new UsernameNotFoundException("user not found");
        }

        return new UserPrincipal(user);
    }
}
