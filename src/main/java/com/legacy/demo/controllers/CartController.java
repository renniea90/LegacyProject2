package com.legacy.demo.controllers;


import com.legacy.demo.dtos.CartItemDto;
import com.legacy.demo.entities.CartItem;
import com.legacy.demo.services.CartItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin ("http://localhost:3000")
@RestController

public class CartController {
    private CartItemService service;

    public CartController(CartItemService service) {this.service = service;}

    @GetMapping("/cart")
    public List<CartItemDto> getAll() {return this.service.getAll();}

    @GetMapping("cart/item")
    public ResponseEntity<?> getCartItem(@PathVariable Integer id) {return this.service.getCartItem(id);}

    @PostMapping("cart/add")
    public ResponseEntity<?> addCartItem(@PathVariable CartItem item){
        return this.service.addCartItem(item);
    }



}
