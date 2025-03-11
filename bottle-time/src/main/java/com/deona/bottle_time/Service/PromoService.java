package com.deona.bottle_time.Service;

import com.deona.bottle_time.Dto.OrderPromoDto;
import com.deona.bottle_time.Dto.PromoDto;
import com.deona.bottle_time.Model.Promo;

import java.util.List;

public interface PromoService {
    public List<PromoDto> getAvailablePromosForUser(Integer userId);
    public void buyPromo(PromoDto promoDto, Integer userId);
    public List<OrderPromoDto> getActivePromos(Integer userId);

}
