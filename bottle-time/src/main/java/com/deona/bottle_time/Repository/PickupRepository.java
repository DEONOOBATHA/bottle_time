package com.deona.bottle_time.Repository;

import com.deona.bottle_time.Model.PickUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Repository
public interface PickupRepository extends JpaRepository<PickUp, Integer> {
    @Query(value="select * from pick_up where is_active = true and finished = false",nativeQuery = true)
    public List<PickUp> findAllActive();


}
