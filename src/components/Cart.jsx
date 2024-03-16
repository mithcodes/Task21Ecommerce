import React from 'react';
import { useEffect, useState } from "react";
import AuthCxt from "../context/AuthContext";
import { AppState } from '../context/Context'; // Import AppState from Context.jsx

const Cart = ({ cart }) => {
  const [cartElements, setCart] = useState([]);
  const { user } = AuthCxt();
  const { state } = AppState();
 
  const cartItem = async (email) => {
    let cleanEmail = removeSpecialCharacters(email);
    let userdata = await fetch(
      `https://crudcrud.com/api/426bbbbc3490407db55ce9c3e95d1267/${cleanEmail}`
    );
    userdata = await userdata.json();
    let setdata = () => {
      setCart(userdata);
      state.cart = userdata;
    };
    setdata();
  };

  function removeSpecialCharacters(text) {
    const cleanedText = text.replace(/[.@]/g, "");
    return cleanedText;
  }
  console.log(cartElements);

  function handleClick() {
    cart((prev) => !prev);
  }
  useEffect(() => {
    cartItem(user);
  }, []);

  return (
    <div className="cart">
      <button onClick={handleClick}>X</button>
      <h1>Cart</h1>
      <div className="cart_Item">
        <h3>Item</h3>
        <h3>Price</h3>
        <h3>Quantity</h3> {/* Corrected spelling of Quantity */}
      </div>
      {cartElements.map((e, index) => ( // Added key prop to the mapped elements
        <div className="cart_Item" key={index}>
          <div>{e.title}</div>
          <div>$ {e.price}</div>
          <div>{e.quantity}</div>
        </div>
      ))}
      <div className="cart_Item total">
        <h4>Total</h4>
        <h4>
          $
          {cartElements.reduce((sum, e) => {
            return sum + e.quantity * e.price;
          }, 0)}
        </h4>
        <div>
          <button>Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
