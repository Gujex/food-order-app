import React, { useState, useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
function Cart({ showCartHandler }) {
  const cartItemsContext = useContext(CartContext);

  const totalAmount = cartItemsContext.totalAmount.toFixed(2);
  const hasItems = cartItemsContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartItemsContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartItemsContext.addItem(item);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartItemsContext.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal showCartHandler={showCartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={showCartHandler} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
