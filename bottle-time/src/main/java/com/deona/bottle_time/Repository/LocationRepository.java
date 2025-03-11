package com.deona.bottle_time.Repository;

import com.deona.bottle_time.Model.Location;
import com.deona.bottle_time.Model.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

    @Query(value = "select l.id as loc_id, l.* from location l " +
            "join user_location ul on l.id = ul.loc_id " +
            "where ul.user_id = :uid",
            nativeQuery = true)
    public List<Location> findByUserId(@Param("uid") Integer userId);

    @Query(value="select * from user_location where loc_id = :lid order by id asc limit 1",nativeQuery = true)
    public UserLocation getUserLocationByLocationId(@Param("lid")Integer id);

    @Query(value="select l.* from location l join user_location ul on l.id = ul.loc_id and ul.id=:lid order by id limit 1",nativeQuery = true)
    public Location getLocationByUserLocationId(@Param("lid")Integer id);
}
