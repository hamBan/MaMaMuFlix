package com.mamamusflix.media_backend.controller;

import com.mamamusflix.media_backend.model.User;
import com.mamamusflix.media_backend.model.UserDTO;
import com.mamamusflix.media_backend.model.UserEmail;
import com.mamamusflix.media_backend.model.UserPasswordDTO;
import com.mamamusflix.media_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController //tells Spring this class handles web requests
@RequestMapping("/api") // Base path for all endpoints
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/addUser") // Maps to POST requests at /api/adduser
    public ResponseEntity<String> addUser(@RequestBody User user) { //automatically maps incoming JSON to a User object
        try {
            // Optional: check if username doesn't exist, don't allow
            if(!userRepository.existsById(user.getUsername())) {
                return ResponseEntity.status(400).body("Provide valid username.");
            }

            User existingUser = userRepository.findById(user.getUsername()).get();
            if (existingUser.getEmailid() != null || existingUser.getPasskeys() != null)
                return ResponseEntity.status(400).body("You have already completed registration.");

            userRepository.save(user); // Saves it to MySQL
            return ResponseEntity.ok("User added successfully.");
        }

        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(@RequestParam String username) {
        Optional<User> userOpt = userRepository.findById(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return ResponseEntity.ok(new UserDTO(user));
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @PostMapping("/updateEmail")
    public ResponseEntity<String> updateEmail(@RequestBody UserEmail userEmail)
    {
        try {
            if (!userRepository.existsById(userEmail.getUsername()))
                return ResponseEntity.status(400).body("User does not exist");

            User user = userRepository.findById(userEmail.getUsername()).get(); // used to get the actual user data from the database
            user.setEmailid(userEmail.getEmailid());
            userRepository.save(user);
            return ResponseEntity.ok("Email updated successfully");
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UserPasswordDTO userPasswordDTO)
    {
        try {
            Optional<User> UserOpt = userRepository.findById(userPasswordDTO.getUsername());
            if(!UserOpt.isPresent())
                return ResponseEntity.status(400).body("User does not exist");

            User user = UserOpt.get(); // used to get the actual user data from the database
            if(user.getPasskeys().equals(userPasswordDTO.getOldPassword())) {
                user.setPasskeys(userPasswordDTO.getNewPassword());
                userRepository.save(user);
                return ResponseEntity.ok("Password updated successfully");
            }

            else {
                return ResponseEntity.status(403).body("Old password doesn't match");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<String> deleteUser(@RequestBody UserPasswordDTO userPasswordDTO)
    {
        try {
            Optional<User> userOptional = userRepository.findById(userPasswordDTO.getUsername());
            if(userOptional.isEmpty())
                return ResponseEntity.status(400).body("User does not exist");

            User user = userOptional.get();
            if(user.getUsername().equals(userPasswordDTO.getUsername()) && user.getPasskeys().equals(userPasswordDTO.getPassword()))
            {
                userRepository.deleteById(user.getUsername());
                return ResponseEntity.ok("User deleted successfully");
            }

            else
                return ResponseEntity.status(403).body("Incorrect password");

        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/checkUser")
    public ResponseEntity<String> checkUser(@RequestBody UserPasswordDTO userPasswordDTO)
    {
        try {
            Optional<User> userOpt = userRepository.findById(userPasswordDTO.getUsername());
            if(userOpt.isEmpty())
                return ResponseEntity.status(400).body("User does not exist");

            User user = userOpt.get();
            if(user.getUsername().equals(userPasswordDTO.getUsername()) && user.getPasskeys().equals(userPasswordDTO.getPassword()))
                return ResponseEntity.ok("Success");

            else
                return ResponseEntity.status(403).body("Failure");
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
