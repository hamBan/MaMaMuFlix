package com.mamamusflix.media_backend.service;

import com.mamamusflix.media_backend.model.User;
import com.mamamusflix.media_backend.model.UserDTO;
import com.mamamusflix.media_backend.model.UserEmail;
import com.mamamusflix.media_backend.model.UserPasswordDTO;
import com.mamamusflix.media_backend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserDetailsService userDetailsService;

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

    public ResponseEntity<String> checkUser(UserPasswordDTO dto, HttpServletResponse response) {
        try {
            Authentication auth = authenticate(dto.getUsername(), dto.getPassword());

            if (!auth.isAuthenticated()) {
                return ResponseEntity.status(401).body("Invalid credentials");
            }

            // Access: short-lived
            String accessToken  = jwtService.generateAccessToken(dto.getUsername());
            // Refresh: long-lived (stateless)
            String refreshToken = jwtService.generateRefreshToken(dto.getUsername());

            // HttpOnly + Secure cookie (sent only to /api/refresh)
            ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/api/refresh")
                    .maxAge(7 * 24 * 60 * 60)  // 7 days
                    .sameSite("Strict")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(accessToken);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }

    /**
     * REFRESH:
     *  - Reads refresh token from HttpOnly cookie
     *  - Validates it and issues new access token
     *  - Rotates refresh token (sets a new cookie)
     */
    public ResponseEntity<String> refreshAccessToken(HttpServletRequest request,
                                                     HttpServletResponse response) {
        String refreshToken = readCookie(request, "refreshToken");
        if (refreshToken == null) {
            return ResponseEntity.status(401).body("Missing refresh token");
        }

        try {
            String username = jwtService.extractUserName(refreshToken);

            // For stateless refresh, validate JWT (signature + expiry)
            var userDetails = userDetailsService.loadUserByUsername(username);
            if (!jwtService.validateToken(refreshToken, userDetails)) {
                return ResponseEntity.status(401).body("Invalid refresh token");
            }

            // Issue new access token
            String newAccessToken = jwtService.generateAccessToken(username);

            // Rotate refresh token for safety (optional but recommended)
            String newRefreshToken = jwtService.generateRefreshToken(username);
            ResponseCookie cookie = ResponseCookie.from("refreshToken", newRefreshToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/api/refresh")
                    .maxAge(7 * 24 * 60 * 60)
                    .sameSite("Strict")
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(newAccessToken);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Refresh failed: " + e.getMessage());
        }
    }

    /**
     * LOGOUT:
     *  - Clears the refresh token cookie
     */
    public ResponseEntity<String> logout(HttpServletResponse response) {
        ResponseCookie clear = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/api/refresh")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, clear.toString());
        return ResponseEntity.ok("Logged out");
    }

    // ---------------- helpers ----------------

    private Authentication authenticate(String username, String rawPassword) {
        return authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, rawPassword)
        );
    }

    private String readCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;
        return Arrays.stream(cookies)
                .filter(c -> name.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
