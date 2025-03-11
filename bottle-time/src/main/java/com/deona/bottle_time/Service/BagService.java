package com.deona.bottle_time.Service;

import com.deona.bottle_time.Dto.BagDto;
import com.deona.bottle_time.Dto.UserDto;
import com.deona.bottle_time.Model.Bag;
import com.deona.bottle_time.Model.User;

import java.util.List;

public interface BagService {
    public void insertBag(Bag bag);
    public List<BagDto> getBagsForUser(Integer id);
    public void saveBag(BagDto bag, UserDto user);
    public void updateBag(BagDto bag, UserDto user);
    public void deleteBag(BagDto bag);
}
