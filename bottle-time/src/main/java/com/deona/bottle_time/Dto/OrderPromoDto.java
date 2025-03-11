package com.deona.bottle_time.Dto;

import com.deona.bottle_time.Model.Promo;
import com.deona.bottle_time.Model.User;
import jakarta.persistence.*;

public class OrderPromoDto {
    private int id;
    private String qrImgUrl;
    private PromoDto promo;


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

    public PromoDto getPromo() {
        return promo;
    }

    public void setPromo(PromoDto promo) {
        this.promo = promo;
    }
}
