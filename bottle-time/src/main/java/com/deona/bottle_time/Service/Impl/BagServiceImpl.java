package com.deona.bottle_time.Service.Impl;

import com.deona.bottle_time.Dto.BagDto;
import com.deona.bottle_time.Dto.Mappers.BagMapper;
import com.deona.bottle_time.Dto.UserDto;
import com.deona.bottle_time.Model.Bag;
import com.deona.bottle_time.Model.User;
import com.deona.bottle_time.Repository.BagRepository;
import com.deona.bottle_time.Repository.UserRepository;
import com.deona.bottle_time.Service.BagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BagServiceImpl implements BagService {

    private final BagRepository bagRepository;
    private final UserRepository userRepository;

    @Autowired
    public BagServiceImpl(BagRepository bagRepository, UserRepository userRepository) {
        this.bagRepository = bagRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void insertBag(Bag bag) {
        bagRepository.save(bag);
    }

    @Override
    public List<BagDto> getBagsForUser(Integer id) {
        return bagRepository.getBagsByUserId(id).stream().map(BagMapper::BagToBagDto).collect(Collectors.toList());
    }

    @Override
    public void saveBag(BagDto bag, UserDto user) {
         bagRepository.save(BagMapper.BagDtoToBag(bag,userRepository.getUserById(user.getId()),false));
    }

    @Override
    public void updateBag(BagDto bag, UserDto user) {
        bagRepository.save(BagMapper.BagDtoToBag(bag,userRepository.getUserById(user.getId()),true));
    }

    @Override
    public void deleteBag(BagDto bag) {
        bagRepository.delete(BagMapper.BagDtoToBag(bag,userRepository.getUserById(bag.getId()),true));
    }
}
