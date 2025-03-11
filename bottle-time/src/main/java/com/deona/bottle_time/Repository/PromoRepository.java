package com.deona.bottle_time.Repository;

import com.deona.bottle_time.Model.OrderPromo;
import com.deona.bottle_time.Model.Promo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PromoRepository extends JpaRepository<Promo, Integer> {

    @Query(value="select * from promo p where p.id not in (select promo_id from order_promo where user_id=:uid)",nativeQuery = true)
    public List<Promo> findAvailablePromosByUserId(@Param("uid")Integer userId);


}
