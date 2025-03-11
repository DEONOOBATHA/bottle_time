package com.deona.bottle_time.Service;

import com.deona.bottle_time.Dto.PickUpDto;

import java.util.List;

public interface PickupService {
    public void orderBag(Integer bagId, Integer locationId);
    public List<PickUpDto> getAllPickup();
    public void acceptPickup(Integer pickupId);
}
