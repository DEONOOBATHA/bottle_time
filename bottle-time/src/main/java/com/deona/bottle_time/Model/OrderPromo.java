package com.deona.bottle_time.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class OrderPromo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String qrImgUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userPromo;
    @ManyToOne
    @JoinColumn(name = "promo_id")
    private Promo promo;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQrImgUrl() {
        return qrImgUrl;
    }

    public void setQrImgUrl(String qrImgUrl) {
        this.qrImgUrl = qrImgUrl;
    }

    public User getUserPromo() {
        return userPromo;
    }

    public void setUserPromo(User userPromo) {
        this.userPromo = userPromo;
    }

    public Promo getPromo() {
        return promo;
    }

    public void setPromo(Promo promo) {
        this.promo = promo;
    }
}
