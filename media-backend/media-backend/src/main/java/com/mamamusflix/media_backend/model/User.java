package com.mamamusflix.media_backend.model;

import jakarta .persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "allusers")
public class User {

    @Id
    @Column(name="username", nullable = false, unique = true)
    private String username;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "emailid")
    private String emailid;

    @Column(name = "passkeys")
    private String passkeys;

    @Column(name = "datejoined", insertable = false, updatable = false)
    private Timestamp datejoined;

    public User() {}

    User(String username, String fullname, String emailid, String passkeys){
        this.username = username;
        this.fullname = fullname;
        this.emailid = emailid;
        this.passkeys = passkeys;
    }

    public String getUsername() {
        return username;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmailid() {
        return emailid;
    }

    public String getPasskeys() {
        return passkeys;
    }

    public Timestamp getDatejoined() {
        return datejoined;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public void setPasskeys(String passkeys) {
        this.passkeys = passkeys;
    }
}
