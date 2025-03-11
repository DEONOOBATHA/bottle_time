package com.deona.bottle_time.Service.Impl;

import com.deona.bottle_time.Dto.Mappers.BagMapper;
import com.deona.bottle_time.Dto.Mappers.LocationMapper;
import com.deona.bottle_time.Dto.Mappers.UserMapper;
import com.deona.bottle_time.Dto.PickUpDto;
import com.deona.bottle_time.Model.Bag;
import com.deona.bottle_time.Model.PickUp;
import com.deona.bottle_time.Model.User;
import com.deona.bottle_time.Repository.BagRepository;
import com.deona.bottle_time.Repository.LocationRepository;
import com.deona.bottle_time.Repository.PickupRepository;
import com.deona.bottle_time.Repository.UserRepository;
import com.deona.bottle_time.Service.PickupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;

@Service
public class PickupServiceImpl implements PickupService {

    private final PickupRepository pickupRepository;
    private final BagRepository bagRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;

    @Autowired
    public PickupServiceImpl(PickupRepository pickupRepository, BagRepository bagRepository, UserRepository userRepository, LocationRepository locationRepository) {
        this.pickupRepository = pickupRepository;
        this.bagRepository = bagRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
    }


    @Override
    public void orderBag(Integer bagId, Integer locationId) {
        PickUp pickUp = new PickUp();
        pickUp.setActive(true);
        pickUp.setFinished(false);
        pickUp.setDate(new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime()));
        pickUp.setTotalBottles(bagRepository.getBagById(bagId).getTotal());
        HashSet<Bag> bags = new HashSet<>();
        Bag b = bagRepository.findById(bagId).orElseThrow(() -> new UsernameNotFoundException("Bag not found"));
        b.setOnDelivery(true);
        bagRepository.save(b);
        bags.add(b);
        pickUp.setPickUpBags(bags);
        pickUp.setUserLocation(locationRepository.getUserLocationByLocationId(locationId));

        pickupRepository.save(pickUp);

    }

    @Override
    public List<PickUpDto> getAllPickup() {
        return pickupRepository.findAllActive()
                .stream()
                .map(x -> new PickUpDto(x.getId(),x.getDate(),x.isFinished(),x.getTotalBottles(),x.isActive(), BagMapper.BagToBagDto( x.getPickUpBags().stream().findFirst().orElse(new Bag())),LocationMapper.LocationToLocationDto(locationRepository.getLocationByUserLocationId(x.getUserLocation().getId())), null))
                .toList();
    }

    @Override
    public void acceptPickup(Integer pickupId) {
        PickUp pickUp = pickupRepository.findById(pickupId).orElseThrow(() -> new UsernameNotFoundException("Pickup not found"));
        pickUp.setActive(false);
        pickUp.setFinished(true);
        User u = pickUp.getUserLocation().getUserLoc();
        u.setBalance(u.getBalance() + pickUp.getTotalBottles());
        userRepository.save(pickUp.getUserLocation().getUserLoc());
        pickupRepository.save(pickUp);
    }
}
