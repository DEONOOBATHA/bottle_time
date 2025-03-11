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
public class Promo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String storeName;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String imgUrl;

    @OneToMany(mappedBy = "promo", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<OrderPromo> orderPromos = new HashSet<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Set<OrderPromo> getOrderPromos() {
        return orderPromos;
    }

    public void setOrderPromos(Set<OrderPromo> orderPromos) {
        this.orderPromos = orderPromos;
    }
}
