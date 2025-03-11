package com.deona.bottle_time.Exceptions;

public class EmailRegistered extends RuntimeException{
    public EmailRegistered(String message) {
        super(message);
    }
}
