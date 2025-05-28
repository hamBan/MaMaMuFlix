package com.mamamusflix.media_backend.model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "allitems")
public class Item {
    @Id
    @Column(name = "uid", nullable = false, unique = true, updatable = false)
    private String uid;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "released")
    private Date released;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "poster")
    private String poster;

    @Column(name = "video")
    private String video;

    @Enumerated(EnumType.STRING)
    @Column(name = "tag", nullable = false)
    private Tag tag;

    @Column(name = "genre")
    private String genre;

    @Column(name = "dateadded", insertable = false, updatable = false)
    private Timestamp dateadded;

    public Item() {}

    public Item(String uid, String title, Date released, Integer duration, String poster, String video, Tag tag, String genre) {
        this.uid = uid;
        this.title = title;
        this.released = released;
        this.duration = duration;
        this.poster = poster;
        this.video = video;
        this.tag = tag;
        this.genre = genre;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getReleased() {
        return released;
    }

    public void setReleased(Date released) {
        this.released = released;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Timestamp getDateadded() {
        return dateadded;
    }

    public enum Tag {
        movie, series
    }
}
