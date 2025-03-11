package com.deona.bottle_time.Dto.Mappers;

import com.deona.bottle_time.Dto.LocationDto;
import com.deona.bottle_time.Model.Location;

public class LocationMapper {
    public static LocationDto LocationToLocationDto(Location location) {
        LocationDto locationDto = new LocationDto();
        locationDto.setId(location.getId());
        locationDto.setX(location.getX());
        locationDto.setY(location.getY());
        locationDto.setName(location.getName());
        return locationDto;
    }
}
