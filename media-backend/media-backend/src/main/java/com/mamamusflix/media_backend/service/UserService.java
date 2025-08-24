package com.mamamusflix.media_backend.service;

import com.mamamusflix.media_backend.model.User;
import com.mamamusflix.media_backend.model.UserDTO;
import com.mamamusflix.media_backend.model.UserEmail;
import com.mamamusflix.media_backend.model.UserPasswordDTO;
import com.mamamusflix.media_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public ResponseEntity<String> addUser(User user) { //automatically maps incoming JSON to a User object
        try {
            // Optional: check if username doesn't exist, don't allow
            if(!userRepository.existsById(user.getUsername())) {
                return ResponseEntity.status(400).body("Provide valid username.");
            }

            User existingUser = userRepository.findById(user.getUsername()).get();
            if (existingUser.getEmailid() != null || existingUser.getPasskeys() != null)
                return ResponseEntity.status(400).body("You have already completed registration.");

            user.setPasskeys(encoder.encode(user.getPasskeys()));
            userRepository.save(user); // Saves it to MySQL
            return ResponseEntity.ok("User added successfully.");
        }

        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    public ResponseEntity<?> getUser(String username) {
        Optional<User> userOpt = userRepository.findById(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return ResponseEntity.ok(new UserDTO(user));
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    public ResponseEntity<String> updateEmail(UserEmail userEmail)
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

    public ResponseEntity<String> updatePassword(UserPasswordDTO userPasswordDTO)
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

    public ResponseEntity<String> deleteUser(UserPasswordDTO userPasswordDTO)
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

    public ResponseEntity<String> checkUser(UserPasswordDTO dto) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
            );

            if (auth.isAuthenticated()) {
                // Generate JWT token
                 String token = jwtService.generateToken(dto.getUsername());
                 return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }
}
