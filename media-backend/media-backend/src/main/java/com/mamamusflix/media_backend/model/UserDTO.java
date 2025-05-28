package com.mamamusflix.media_backend.model;

import com.mamamusflix.media_backend.model.User;
import java.text.SimpleDateFormat;

public class UserDTO {
    private String username;
    private String fullname;
    private String emailid;
    private String datejoined;

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.fullname = user.getFullname();
        this.emailid = user.getEmailid();

        if (user.getDatejoined() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            this.datejoined = sdf.format(user.getDatejoined());
        } else {
            this.datejoined = null;
        }
    }

    // Getters only (DTOs are typically immutable)
    public String getUsername() { return username; }
    public String getFullname() { return fullname; }
    public String getEmailid() { return emailid; }
    public String getDatejoined() { return datejoined; }
}