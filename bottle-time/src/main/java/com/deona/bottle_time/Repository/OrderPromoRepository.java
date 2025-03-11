package com.deona.bottle_time.Repository;

import com.deona.bottle_time.Model.OrderPromo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderPromoRepository extends JpaRepository<OrderPromo, Integer> {
    @Query(value="select * from order_promo where user_id=:uid",nativeQuery = true)
    public List<OrderPromo> findOrderPromosByUserId(@Param("uid")Integer userId);
}
