package com.deona.bottle_time.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class PickUp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String date;
    private boolean finished;
    @Column(nullable = false)
    private int totalBottles;
    private boolean isActive;



    @OneToMany(mappedBy = "pickUp", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Bag> pickUpBags = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_loc_id")
    private UserLocation userLocation;

    @ManyToOne
    @JoinColumn(name = "id_deliverer")
    private User userPickUp;


    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public int getTotalBottles() {
        return totalBottles;
    }

    public void setTotalBottles(int totalBottles) {
        this.totalBottles = totalBottles;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Set<Bag> getPickUpBags() {
        return pickUpBags;
    }

    public void setPickUpBags(Set<Bag> pickUpBags) {
        this.pickUpBags = pickUpBags;
    }

    public UserLocation getUserLocation() {
        return userLocation;
    }

    public void setUserLocation(UserLocation userLocation) {
        this.userLocation = userLocation;
    }

    public User getUserPickUp() {
        return userPickUp;
    }

    public void setUserPickUp(User userPickUp) {
        this.userPickUp = userPickUp;
    }
}
