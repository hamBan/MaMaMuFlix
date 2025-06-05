package com.mamamusflix.media_backend.model;

import jakarta.persistence.Column;

import java.util.Date;

public class ItemDTO {
    
    private String uid;
    private String title;
    private Date released;
    private Integer duration;
    private String poster;
    private String video;
    private String tag;
    private String genre;

    public ItemDTO() {}

    public ItemDTO(String uid, String title, Date released, Integer duration, String poster, String video, String tag, String genre) {
        this.uid = uid;
        this.title = title;
        this.released = released;
        this.duration = duration;
        this.poster = poster;
        this.video = video;
        this.tag = tag;
        this.genre = genre;
    }

    public ItemDTO(String title, Date released, Integer duration, String poster, String video, String tag, String genre) {
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

    public String getTitle() {
        return title;
    }

    public Date getReleased() {
        return released;
    }

    public Integer getDuration() {
        return duration;
    }

    public String getPoster() {
        return poster;
    }

    public String getVideo() {
        return video;
    }

    public String getTag() {
        return tag;
    }

    public String getGenre() {
        return genre;
    }
}
