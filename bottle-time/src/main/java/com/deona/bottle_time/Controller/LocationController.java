package com.deona.bottle_time.Controller;

import com.deona.bottle_time.Dto.LocationDto;
import com.deona.bottle_time.Model.Location;
import com.deona.bottle_time.Model.PointOne;
import com.deona.bottle_time.Service.LocationService;
import com.deona.bottle_time.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/maps/")
public class LocationController {
    private final LocationService locationService;
    private final UserService userService;

    @Autowired
    public LocationController(LocationService locationService, UserService userService) {
        this.locationService = locationService;
        this.userService = userService;
    }

    @PostMapping("save_location")
    public void saveLocation(@RequestBody PointOne location) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        locationService.saveLocation(location,userService.getUserByUsername(authentication.getName()));
    }

    @GetMapping("my_locations")
    public List<LocationDto> getMyLocations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return locationService.getLocationsForUserId(userService.getUserByUsername(authentication.getName()).getId());
    }

}
