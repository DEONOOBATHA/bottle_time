package com.deona.bottle_time.Dto;

public class BagDto {
    private int id;
    private int total;
    private boolean isOnDelivery;


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
}
