package com.deona.bottle_time.Dto.Mappers;

import com.deona.bottle_time.Dto.OrderPromoDto;
import com.deona.bottle_time.Model.OrderPromo;
import com.deona.bottle_time.Model.Promo;

public class OrderPromoMapper {

    public static OrderPromoDto OrderPromoToOrderPromoDto(OrderPromo orderPromo) {
        OrderPromoDto orderPromoDto = new OrderPromoDto();
        orderPromoDto.setId(orderPromo.getId());
        orderPromoDto.setQrImgUrl(orderPromo.getQrImgUrl());
        orderPromoDto.setPromo(PromoMapper.PromoToPromoDto(orderPromo.getPromo()));
        return orderPromoDto;
    }


}
