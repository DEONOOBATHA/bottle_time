package com.deona.bottle_time.Dto.Mappers;

import com.deona.bottle_time.Dto.BagDto;
import com.deona.bottle_time.Model.Bag;
import com.deona.bottle_time.Model.User;

public class BagMapper {

    public static BagDto BagToBagDto(Bag bag) {
        BagDto bagDto = new BagDto();
        bagDto.setId(bag.getId());
        bagDto.setTotal(bag.getTotal());
        bagDto.setOnDelivery(bag.isOnDelivery());
        return bagDto;
    }

    public static Bag BagDtoToBag(BagDto bagDto, User user, boolean withId) {
        Bag bag = new Bag();
        if(withId){
            bag.setId(bagDto.getId());
        }
        bag.setTotal(bagDto.getTotal());
        bag.setUserBag(user);
        bag.setOnDelivery(bagDto.isOnDelivery());
        return bag;
    }
}
