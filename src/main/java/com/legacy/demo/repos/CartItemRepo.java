package com.legacy.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.legacy.demo.entities.CartItem;

@Repository
public interface CartItemRepo extends JpaRepository <CartItem, Integer> {

}
