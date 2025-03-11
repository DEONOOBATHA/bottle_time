package com.deona.bottle_time.Controller;


import com.deona.bottle_time.Dto.BagDto;
import com.deona.bottle_time.Service.BagService;
import com.deona.bottle_time.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bags/")
public class BagController {

    private final BagService bagService;
    private final UserService userService;
    @Autowired
    public BagController(BagService bagService, UserService userService) {
        this.bagService = bagService;
        this.userService = userService;
    }

    @GetMapping("my_bags")
    public List<BagDto> getMyBags(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return bagService.getBagsForUser(userService.getUserByUsername(authentication.getName()).getId());
    }


    @PostMapping("new_bag")
    public ResponseEntity<?> newBag(@RequestBody BagDto bagDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        bagService.saveBag(bagDto,userService.getUserByUsername(authentication.getName()));
        return ResponseEntity.ok().build();
    }

    @PostMapping("update_bag")
    public ResponseEntity<?> updateBag(@RequestBody BagDto bagDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        bagService.updateBag(bagDto,userService.getUserByUsername(authentication.getName()));
        return ResponseEntity.ok().build();
    }

    @PostMapping("delete_bag")
    public ResponseEntity<?> deleteBag(@RequestBody BagDto bagDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        bagService.deleteBag(bagDto);
        return ResponseEntity.ok().build();
    }




}
