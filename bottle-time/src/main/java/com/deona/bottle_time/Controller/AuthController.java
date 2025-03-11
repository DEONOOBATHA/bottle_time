package com.deona.bottle_time.Controller;

import com.deona.bottle_time.Dto.LoginDto;
import com.deona.bottle_time.Dto.RegistrationDto;
import com.deona.bottle_time.Exceptions.EmailRegistered;
import com.deona.bottle_time.Exceptions.UsernameExists;
import com.deona.bottle_time.Repository.UserRepository;
import com.deona.bottle_time.Service.AuthService;
import com.deona.bottle_time.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final UserRepository userRepository;


    @GetMapping("check")
    public ResponseEntity<String> checkAuth(HttpServletRequest request) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context != null ? context.getAuthentication() : null;

        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok().body(authentication.getName());
        }

        logger.info("Authentication check failed - Context: {}, Authentication: {}",
                context, authentication);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    private final AuthenticationManager authenticationManager;
    private UserService userService;
    private final SecurityContextRepository securityContextRepository;


    @Autowired
    public AuthController(UserService userService, AuthenticationManager authenticationManager, SecurityContextRepository securityContextRepository, UserRepository userRepository) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.securityContextRepository = securityContextRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("register")
    public ResponseEntity<?> register(){
        return ResponseEntity.ok().build();
    }

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDto user){
        try {
            userService.registerUser(user);
            //TODO REDIRECT IF REGISTRATION SUCCESSFUL
            return ResponseEntity.ok().build();
        }catch (EmailRegistered erError){
            //TODO REDIRECT IF IF EMAIL ALREADY REGISTERED
        }
        catch(UsernameExists ueError){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            //TODO REDIRECT IF USERNAME EXIST
        }
        return ResponseEntity.status(HttpStatus.IM_USED).build();
    }

    @GetMapping("home")
    public String home(){
        return "Good";
    }




    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
            );

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

            securityContextRepository.saveContext(context, request, response);

            return ResponseEntity.ok().body(authentication.getName());
        } catch (AuthenticationException e) {
            logger.error("Authentication failed", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // Clear the security context
        SecurityContextHolder.clearContext();

        // Clear the JSESSIONID cookie
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }



    @GetMapping("is_deliverer")
    public Boolean checkDeliverer(HttpServletRequest request) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context != null ? context.getAuthentication() : null;

        if (authentication != null && authentication.isAuthenticated()
                && userService.isUserDeliverer(userService.getUserByUsername(authentication.getName()).getId())) {
            System.out.println( userService.isUserDeliverer(userService.getUserByUsername(authentication.getName()).getId()));
            return true;
        }
        System.out.println("lol");

        return false;
    }



}