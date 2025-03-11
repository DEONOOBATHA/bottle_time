package com.deona.bottle_time.Controller;

import com.deona.bottle_time.Dto.OrderPromoDto;
import com.deona.bottle_time.Dto.PromoDto;
import com.deona.bottle_time.Model.OrderPromo;
import com.deona.bottle_time.Model.Promo;
import com.deona.bottle_time.Service.PromoService;
import com.deona.bottle_time.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promo/")
public class PromoController {

    private final PromoService promoService;
    private final UserService userService;


    public PromoController(PromoService promoService, UserService userService) {
        this.promoService = promoService;
        this.userService = userService;
    }

    @GetMapping("get_my_promos")
    public List<PromoDto> getMyPromos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return promoService.getAvailablePromosForUser(userService.getUserByUsername(authentication.getName()).getId());
    }

    @PostMapping("buy_promo")
    public ResponseEntity<?> buyPromo(@RequestBody PromoDto promoDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(userService.getUserByUsername(authentication.getName()).getBalance()>promoDto.getPrice()) {
            promoService.buyPromo(promoDto, userService.getUserByUsername(authentication.getName()).getId());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("get_active")
    public List<OrderPromoDto> getActivePromos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return promoService.getActivePromos(userService.getUserByUsername(authentication.getName()).getId());
    }

}
