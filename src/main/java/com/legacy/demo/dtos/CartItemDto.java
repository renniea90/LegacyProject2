//package com.legacy.demo.dtos;
//import com.legacy.demo.entities.CartItem;
//import com.legacy.demo.entities.Item;
//
//
//import java.util.Objects;
//
//public class CartItemDto {
//
//    public class CartItemDto {
//
//
//        private Integer id;
//        private CartItem cartItem;
//
//        public CartItem( Integer id, Item item) {
//            this.id = id;
//            this.item = item;
//        }
//
//        public CartItem() {
//        }
//
//        public CartItem(Item item) {
//            this.id = item.getId();
//            this.item = item;
//        }
//
//        public Integer getId() {
//            return id;
//        }
//
//        public void setId(Integer id) {
//            this.id = id;
//        }
//
//        public Item getItem() {
//            return item;
//        }
//
//        public void setItem(Item item) {
//            this.item = item;
//        }
//
//        @Override
//        public String toString() {
//            return "CartItem: id=" + id + ", item=" + item;
//        }
//
//        @Override
//        public boolean equals(Object obj) {
//            if (this == obj)
//                return true;
//            if (obj == null)
//                return false;
//            if (getClass() != obj.getClass())
//                return false;
//            com.legacy.demo.entities.CartItem other = (com.legacy.demo.entities.CartItem) obj;
//            return Objects.equals(id, other.id) && Objects.equals(item, other.item);
//        }
//
//    }
//
//
//
//
//}
