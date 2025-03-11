package com.deona.bottle_time.Service;

import com.deona.bottle_time.Dto.LocationDto;
import com.deona.bottle_time.Dto.OrderPromoDto;
import com.deona.bottle_time.Dto.UserDto;
import com.deona.bottle_time.Model.Location;
import com.deona.bottle_time.Model.OrderPromo;
import com.deona.bottle_time.Model.PointOne;
import com.deona.bottle_time.Model.User;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;

@Service
public interface LocationService {

    public void saveLocation(PointOne point, UserDto user);

    public List<LocationDto> getLocationsForUserId(Integer userId);
}
