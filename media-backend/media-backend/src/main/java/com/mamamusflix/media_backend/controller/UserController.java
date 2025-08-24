package com.mamamusflix.media_backend.controller;

import com.mamamusflix.media_backend.model.User;
import com.mamamusflix.media_backend.model.UserDTO;
import com.mamamusflix.media_backend.model.UserEmail;
import com.mamamusflix.media_backend.model.UserPasswordDTO;
import com.mamamusflix.media_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController //tells Spring this class handles web requests
@RequestMapping("/api") // Base path for all endpoints
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/addUser") // Maps to POST requests at /api/adduser
    public ResponseEntity<String> register(@RequestBody User user) { //automatically maps incoming JSON to a User object
        return userService.addUser(user);
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(@RequestParam String username) {
        return userService.getUser(username);
    }

    @PostMapping("/updateEmail")
    public ResponseEntity<String> updateEmail(@RequestBody UserEmail userEmail) {
        return userService.updateEmail(userEmail);
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UserPasswordDTO userPasswordDTO) {
        return userService.updatePassword(userPasswordDTO);
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<String> deleteUser(@RequestBody UserPasswordDTO userPasswordDTO)
    {
        return userService.deleteUser(userPasswordDTO);
    }

    @PostMapping("/checkUser")
    public ResponseEntity<String> checkUser(@RequestBody UserPasswordDTO userPasswordDTO) {
//        System.out.println("LOGIN ATTEMPT: " + userPasswordDTO.getUsername());
        return userService.checkUser(userPasswordDTO);
    }
}
