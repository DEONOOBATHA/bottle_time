package com.deona.bottle_time.Dto.Mappers;

import com.deona.bottle_time.Dto.RegistrationDto;
import com.deona.bottle_time.Dto.UserDto;
import com.deona.bottle_time.Model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

public class UserMapper {


    public static User RegistrationDtoToUser(RegistrationDto registrationDto,  PasswordEncoder passwordEncoder){
        User user = new User();
        user.setEmail(registrationDto.getEmail());
        user.setUsername(registrationDto.getUsername());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setName(registrationDto.getName());
        user.setPhoneNr(registrationDto.getPhoneNr());
        HashSet<String> roles = new HashSet<>();
        if(registrationDto.getIsDeliverer())
            roles.add("ROLE_DELIVERER");
        else roles.add("ROLE_USER");
        user.setRoles(roles);
        return user;
    }

    public static UserDto UserToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setName(user.getName());
        userDto.setPhoneNr(user.getPhoneNr());
        userDto.setDeliverer(user.getRoles().contains("deliverer"));
        userDto.setImgUrl(user.getImgURL());
        userDto.setBalance(user.getBalance());
        userDto.setReportNumber(user.getReportsNr());
        userDto.setId(user.getId());
        return userDto;
    }

}
