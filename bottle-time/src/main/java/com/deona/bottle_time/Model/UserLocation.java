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
public class UserLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userLoc;
    @ManyToOne
    @JoinColumn(name = "loc_id")
    private Location locUser;
    @OneToMany(mappedBy = "id", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<PickUp> pickUps = new HashSet<>();


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUserLoc() {
        return userLoc;
    }

    public void setUserLoc(User userLoc) {
        this.userLoc = userLoc;
    }

    public Location getLocUser() {
        return locUser;
    }

    public void setLocUser(Location locUser) {
        this.locUser = locUser;
    }

    public Set<PickUp> getPickUps() {
        return pickUps;
    }

    public void setPickUps(Set<PickUp> pickUps) {
        this.pickUps = pickUps;
    }
}
