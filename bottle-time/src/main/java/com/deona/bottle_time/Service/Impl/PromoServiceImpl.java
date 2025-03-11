package com.deona.bottle_time.Service.Impl;

import com.deona.bottle_time.Dto.Mappers.OrderPromoMapper;
import com.deona.bottle_time.Dto.Mappers.PromoMapper;
import com.deona.bottle_time.Dto.OrderPromoDto;
import com.deona.bottle_time.Dto.PromoDto;
import com.deona.bottle_time.Model.OrderPromo;
import com.deona.bottle_time.Model.Promo;
import com.deona.bottle_time.Model.User;
import com.deona.bottle_time.Repository.OrderPromoRepository;
import com.deona.bottle_time.Repository.PromoRepository;
import com.deona.bottle_time.Repository.UserRepository;
import com.deona.bottle_time.Service.PromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromoServiceImpl implements PromoService {

    private final PromoRepository promoRepository;
    private final UserRepository userRepository;
    private final OrderPromoRepository orderPromoRepository;

    @Autowired
    public PromoServiceImpl(PromoRepository promoRepository, UserRepository userRepository, OrderPromoRepository orderPromoRepository) {
        this.promoRepository = promoRepository;
        this.userRepository = userRepository;
        this.orderPromoRepository = orderPromoRepository;
    }

    @Override
    public List<PromoDto> getAvailablePromosForUser(Integer userId) {
        return promoRepository.findAvailablePromosByUserId(userId)
                .stream()
                .map(PromoMapper::PromoToPromoDto)
                .collect(Collectors.toList());
    }

    @Override
    public void buyPromo(PromoDto promoDto, Integer userId) {
        OrderPromo orderPromo = new OrderPromo();
        orderPromo.setPromo(PromoMapper.PromoDtoToPromo(promoDto));
        orderPromo.setUserPromo(userRepository.findById(userId).get());
        orderPromo.setQrImgUrl("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+promoDto.getId()+"_"+userRepository.getUserById(userId).getUsername());
        orderPromoRepository.save(orderPromo);
        User updatedUser = userRepository.findById(userId).get();
        updatedUser.setBalance(updatedUser.getBalance() - promoDto.getPrice());
        userRepository.save(updatedUser);
    }

    @Override
    public List<OrderPromoDto> getActivePromos(Integer userId) {
        return orderPromoRepository.findOrderPromosByUserId(userId)
                .stream()
                .map(OrderPromoMapper::OrderPromoToOrderPromoDto)
                .collect(Collectors.toList());
    }
}
