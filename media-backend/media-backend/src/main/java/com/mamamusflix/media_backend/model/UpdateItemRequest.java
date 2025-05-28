package com.mamamusflix.media_backend.model;

import java.util.Date;

public class UpdateItemRequest {

    private String uid;
    private String title;
    private Date released;
    private Integer duration;
    private String poster;
    private String video;
    private Item.Tag tag;
    private String genre;

    public UpdateItemRequest(String uid, String title, Date released, Integer duration, String poster, String video, Item.Tag tag, String genre) {
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

    public Item.Tag getTag() {
        return tag;
    }

    public void setTag(Item.Tag tag) {
        this.tag = tag;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
