//package com.legacy.demo.entities;
//
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//
//import java.util.Objects;
//
//@Entity
//public class CartItem {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//    private Item item;
//
//    public CartItem( Integer id, Item item) {
//        this.id = id;
//        this.item = item;
//    }
//
//    public CartItem() {
//    }
//
//    public CartItem(Item item) {
//        this.id = item.getId();
//        this.item = item;
//    }
//
//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public Item getItem() {
//        return item;
//    }
//
//    public void setItem(Item item) {
//        this.item = item;
//    }
//
//    @Override
//    public String toString() {
//        return "CartItem: id=" + id + ", item=" + item;
//    }
//
//    @Override
//    public boolean equals(Object obj) {
//        if (this == obj)
//            return true;
//        if (obj == null)
//            return false;
//        if (getClass() != obj.getClass())
//            return false;
//        CartItem other = (CartItem) obj;
//        return Objects.equals(id, other.id) && Objects.equals(item, other.item);
//    }
//
//}
