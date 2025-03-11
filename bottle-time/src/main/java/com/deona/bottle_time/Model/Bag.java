package com.deona.bottle_time.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Bag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int total;
    private boolean isOnDelivery;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userBag;
    @ManyToOne
    @JoinColumn(name = "id_req_PickUp")
    private PickUp pickUp;


    public boolean isOnDelivery() {
        return isOnDelivery;
    }

    public void setOnDelivery(boolean onDelivery) {
        isOnDelivery = onDelivery;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public User getUserBag() {
        return userBag;
    }

    public void setUserBag(User userBag) {
        this.userBag = userBag;
    }

    public PickUp getPickUp() {
        return pickUp;
    }

    public void setPickUp(PickUp pickUp) {
        this.pickUp = pickUp;
    }
}
