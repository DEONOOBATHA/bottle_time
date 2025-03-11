package com.deona.bottle_time.Service.Impl;

import com.deona.bottle_time.Dto.LocationDto;
import com.deona.bottle_time.Dto.Mappers.LocationMapper;
import com.deona.bottle_time.Dto.UserDto;
import com.deona.bottle_time.Model.Location;
import com.deona.bottle_time.Model.PointOne;
import com.deona.bottle_time.Model.UserLocation;
import com.deona.bottle_time.Repository.LocationRepository;
import com.deona.bottle_time.Repository.UserLocationRepository;
import com.deona.bottle_time.Repository.UserRepository;
import com.deona.bottle_time.Service.LocationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;
    private final UserLocationRepository userLocationRepository;
    private final UserRepository userRepository;

    @Autowired
    public LocationServiceImpl(LocationRepository locationRepository, UserLocationRepository userLocationRepository, UserRepository userRepository) {
        this.locationRepository = locationRepository;
        this.userLocationRepository = userLocationRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void saveLocation(PointOne point, UserDto user) {
        Location l = new Location();
        l.setX((double) point.getX());
        l.setY((double) point.getY());
        l.setLocation(new java.awt.Point(0,0));
        l.setName(point.getName());

        Location savedLocation = locationRepository.save(l);

        UserLocation userLocation = new UserLocation();
        userLocation.setLocUser(savedLocation);
        userLocation.setUserLoc(userRepository.getUserById(user.getId()));
        userLocationRepository.save(userLocation);
    }

    @Override
    public List<LocationDto> getLocationsForUserId(Integer userId) {
        return locationRepository.findByUserId(userId)
                .stream()
                .map(LocationMapper::LocationToLocationDto)
                .collect(Collectors.toList());

    }
}
