package com.deona.bottle_time.Service.Impl;

import com.deona.bottle_time.Dto.Mappers.UserMapper;
import com.deona.bottle_time.Dto.RegistrationDto;
import com.deona.bottle_time.Dto.UserDto;
import com.deona.bottle_time.Model.User;
import com.deona.bottle_time.Repository.UserRepository;
import com.deona.bottle_time.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void registerUser(RegistrationDto user) {
        userRepository.save(UserMapper.RegistrationDtoToUser(user, passwordEncoder));
    }

    @Override
    public UserDto findUserById(Integer id) {
        return UserMapper.UserToUserDto(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found")));
    }

    @Override
    public UserDto getUserByUsername(String username) {
        return UserMapper.UserToUserDto(userRepository.findFirstByUsername(username).orElseThrow(() -> new RuntimeException("User Not Found")));
    }

    @Override
    public boolean isUserDeliverer(Integer id){
        System.out.println(userRepository.isDeliverer(id));
        return userRepository.isDeliverer(id)>0;
    }

}
