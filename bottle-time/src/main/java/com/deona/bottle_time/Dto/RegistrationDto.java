package com.deona.bottle_time.Dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDto {
    private String username;
    private String password;
    private String name;
    private String email;
    private String phoneNr;
    private Boolean isDeliverer;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getDeliverer() {
        return isDeliverer;
    }

    public void setDeliverer(Boolean deliverer) {
        isDeliverer = deliverer;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNr() {
        return phoneNr;
    }

    public void setPhoneNr(String phoneNr) {
        this.phoneNr = phoneNr;
    }

    public Boolean getIsDeliverer() {
        return isDeliverer;
    }

    public void setIsDeliverer(Boolean deliverer) {
        isDeliverer = deliverer;
    }
}
