package com.mamamusflix.media_backend.model;

import jakarta.persistence.Column;

import java.util.Date;

public class ItemDTO {
    
    private String uid;
    private String title;
    private String poster;
    private Item.Tag tag;

    public ItemDTO() {}

    public ItemDTO(String uid, String title, String poster, Item.Tag tag) {
        this.uid = uid;
        this.title = title;
        this.poster = poster;
        this.tag = tag;
    }

    public String getUid() {
        return uid;
    }

    public String getTitle() {
        return title;
    }

//    public Date getReleased() {
//        return released;
//    }

//    public Integer getDuration() {
//        return duration;
//    }

    public String getPoster() {
        return poster;
    }

//    public String getVideo() {
//        return video;
//    }

    public Item.Tag getTag() {
        return tag;
    }

//    public String getGenre() {
//        return genre;
//    }
}
