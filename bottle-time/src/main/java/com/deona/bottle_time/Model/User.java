package com.deona.bottle_time.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String phoneNr;
    private int balance;
    private int reportsNr;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>();
    private String imgURL;
    private Point currentLocation;

    @OneToMany(mappedBy = "userPromo", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<OrderPromo> orderPromos = new HashSet<>();
    @OneToMany(mappedBy = "userBag", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Bag> bags = new HashSet<>();
    @OneToMany(mappedBy = "userLoc", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<UserLocation> userLocations = new HashSet<>();
    @OneToMany(mappedBy = "userPickUp", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<PickUp> pickUps = new HashSet<>();


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNr() {
        return phoneNr;
    }

    public void setPhoneNr(String phoneNr) {
        this.phoneNr = phoneNr;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public int getReportsNr() {
        return reportsNr;
    }

    public void setReportsNr(int reportsNr) {
        this.reportsNr = reportsNr;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public Point getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(Point currentLocation) {
        this.currentLocation = currentLocation;
    }

    public Set<OrderPromo> getOrderPromos() {
        return orderPromos;
    }

    public void setOrderPromos(Set<OrderPromo> orderPromos) {
        this.orderPromos = orderPromos;
    }

    public Set<Bag> getBags() {
        return bags;
    }

    public void setBags(Set<Bag> bags) {
        this.bags = bags;
    }

    public Set<UserLocation> getUserLocations() {
        return userLocations;
    }

    public void setUserLocations(Set<UserLocation> userLocations) {
        this.userLocations = userLocations;
    }

    public Set<PickUp> getPickUps() {
        return pickUps;
    }

    public void setPickUps(Set<PickUp> pickUps) {
        this.pickUps = pickUps;
    }
}
