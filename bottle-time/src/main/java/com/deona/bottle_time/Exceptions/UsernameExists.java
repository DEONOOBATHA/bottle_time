package com.deona.bottle_time.Exceptions;

public class UsernameExists extends RuntimeException {
  public UsernameExists(String message) {
    super(message);
  }
}
