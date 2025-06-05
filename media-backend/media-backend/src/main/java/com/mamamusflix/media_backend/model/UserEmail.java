package com.mamamusflix.media_backend.model;

public class UserEmail {
    private String username;
    private String emailid;

    public UserEmail() {}

    public UserEmail(String username, String emailid) {
        this.username = username;
        this.emailid = emailid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }
}
