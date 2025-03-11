package com.deona.bottle_time.Dto.Mappers;

import com.deona.bottle_time.Dto.PromoDto;
import com.deona.bottle_time.Dto.PromoDtoBuilder;
import com.deona.bottle_time.Model.Promo;

public class PromoMapper {

    public static PromoDto PromoToPromoDto(Promo promo) {
        return  new PromoDtoBuilder()
                .id(promo.getId())
                .description(promo.getDescription())
                .imgUrl(promo.getImgUrl())
                .price(promo.getPrice())
                .storeName(promo.getStoreName())
                .build();
    }

    public static Promo PromoDtoToPromo(PromoDto promoDto) {
        Promo promo = new Promo();
        promo.setId(promoDto.getId());
        promo.setDescription(promoDto.getDescription());
        promo.setImgUrl(promoDto.getImgUrl());
        promo.setPrice(promoDto.getPrice());
        promo.setStoreName(promoDto.getStoreName());
        return promo;
    }
}
