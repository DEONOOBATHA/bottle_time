package com.deona.bottle_time.Controller;


import com.deona.bottle_time.Dto.PickUpDto;
import com.deona.bottle_time.Service.PickupService;
import com.deona.bottle_time.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pickup/")
public class PickupOrderController {
    private final PickupService pickupService;
    private final UserService userService;

    @Autowired
    public PickupOrderController(PickupService pickupService, UserService userService) {
        this.pickupService = pickupService;
        this.userService = userService;
    }

    @PostMapping("order/bag={bag_id}&loc={loc_id}")
    public void orderBag(@PathVariable("bag_id") Integer bagId, @PathVariable("loc_id") Integer locationId) {
        pickupService.orderBag(bagId, locationId);
    }

    @GetMapping("deliverer/get_all")
    public List<PickUpDto> getAllDeliverer() {
        return pickupService.getAllPickup();
    }

    @PostMapping("deliverer/accept/id={pickupId}")
    public void acceptOrder(@PathVariable("pickupId") Integer orderId) {
        pickupService.acceptPickup(orderId);
    }

}
