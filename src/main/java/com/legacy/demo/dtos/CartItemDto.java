package com.legacy.demo.dtos;

import com.legacy.demo.entities.CartItem;
import com.legacy.demo.entities.Item;

import org.springframework.data.relational.core.sql.In;


import java.util.Objects;

public class CartItemDto {

    private Integer id;
    private Integer itemId;
    private Integer quantity;

    public CartItemDto() {super();
    }
    public CartItemDto(CartItem cartItem){
        super();
        this.id = cartItem.getId();
        this.itemId = cartItem.getItemId();
        this.quantity = cartItem.getQuantity();

    }


    public CartItemDto(Integer id, Integer itemId, Integer quantity) {
        super();
        this.id = id;
        this.itemId = itemId;
        this.quantity = quantity;
    }

    public CartItemDto(Integer itemId, Integer quantity) {
        super();
        this.itemId = getItemId();
        this.quantity = getQuantity();
    }


    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }
}


