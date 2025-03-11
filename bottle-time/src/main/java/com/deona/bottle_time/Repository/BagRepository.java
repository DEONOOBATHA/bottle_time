package com.deona.bottle_time.Repository;


import com.deona.bottle_time.Model.Bag;
import com.deona.bottle_time.Model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BagRepository extends JpaRepository<Bag,Integer> {
    public List<Bag> getBagByUserBag(User user);
    public void deleteBagByUserBag(User user);
    @Query(value="select * from bag b where b.user_id=:uid",nativeQuery = true)
    public List<Bag> getBagsByUserId(@Param("uid")Integer userId);
    @Query(value="select * from bag b where b.id = :bid",nativeQuery = true)
    public Bag getBagById(@Param("bid")Integer bagId);
}
