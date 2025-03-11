package com.deona.bottle_time.Repository;

import com.deona.bottle_time.Model.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLocationRepository extends JpaRepository<UserLocation, Integer> {
}
