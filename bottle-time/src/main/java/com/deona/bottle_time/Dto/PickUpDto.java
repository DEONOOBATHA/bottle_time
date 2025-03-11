package com.deona.bottle_time.Dto;

import com.deona.bottle_time.Model.Bag;
import com.deona.bottle_time.Model.Location;
import com.deona.bottle_time.Model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor

public class PickUpDto{
    private Integer id;
    private String date;
    private boolean finished;
    private Integer totalBottles;
    private boolean isActive;
    private BagDto bag;
    private LocationDto location;
    private UserDto user;

    public PickUpDto(Integer id, String date, boolean finished, Integer totalBottles, boolean isActive, BagDto bag, LocationDto location, UserDto user) {
        this.id = id;
        this.date = date;
        this.finished = finished;
        this.totalBottles = totalBottles;
        this.isActive = isActive;
        this.bag = bag;
        this.location = location;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public Integer getTotalBottles() {
        return totalBottles;
    }

    public void setTotalBottles(Integer totalBottles) {
        this.totalBottles = totalBottles;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public BagDto getBag() {
        return bag;
    }

    public void setBag(BagDto bag) {
        this.bag = bag;
    }

    public LocationDto getLocation() {
        return location;
    }

    public void setLocation(LocationDto location) {
        this.location = location;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
