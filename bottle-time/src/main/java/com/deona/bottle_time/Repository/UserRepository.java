package com.deona.bottle_time.Repository;


import com.deona.bottle_time.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    public User getUserById(Integer id);

    public Optional<User> findFirstByUsername(String username);

    @Query(value="select count(*) from user_roles ur where ur.user_id=:uid and ur.role = 'ROLE_DELIVERER'",nativeQuery = true)
    public int isDeliverer(@Param("uid")Integer id);
}
