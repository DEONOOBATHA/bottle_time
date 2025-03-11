package com.deona.bottle_time.Dto;

public class PromoDto {
    private final int id;
    private final String storeName;
    private final int price;
    private final String description;
    private final String imgUrl;

    PromoDto(int id, String storeName, int price, String description, String imgUrl) {
        this.id = id;
        this.storeName = storeName;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
    }

    public int getId() {
        return id;
    }

    public String getStoreName() {
        return storeName;
    }

    public int getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getImgUrl() {
        return imgUrl;
    }
}