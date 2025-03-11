package com.deona.bottle_time.Dto;

public class PromoDtoBuilder {
    private int id;
    private String storeName;
    private int price;
    private String description;
    private String imgUrl;

    public PromoDtoBuilder id(int id) {
        this.id = id;
        return this;
    }

    public PromoDtoBuilder storeName(String storeName) {
        this.storeName = storeName;
        return this;
    }

    public PromoDtoBuilder price(int price) {
        this.price = price;
        return this;
    }

    public PromoDtoBuilder description(String description) {
        this.description = description;
        return this;
    }

    public PromoDtoBuilder imgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
        return this;
    }

    public PromoDto build() {
        return new PromoDto(id, storeName, price, description, imgUrl);
    }
}