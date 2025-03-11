package com.deona.bottle_time.Service;

import com.deona.bottle_time.Dto.RegistrationDto;
import com.deona.bottle_time.Dto.UserDto;

public interface UserService {
    public void registerUser(RegistrationDto user);
    public UserDto findUserById(Integer id);
    public UserDto getUserByUsername(String username);
    public boolean isUserDeliverer(Integer id);
}
