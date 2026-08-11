import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalCost = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <header>
        <h2>Paradise Nursery</h2>
        <p>Shopping Cart</p>
      </header>

      <div className="cart-summary">
        <h2>
          Total Cart Amount: ${totalCost.toFixed(2)}
        </h2>

        <p>
          Total Plants: {totalQuantity}
        </p>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
                width="120"
              />

              <div className="cart-item-details">
                <h3>{item.name}</h3>

                <p>
                  Unit Price: ${item.price}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p>
                  Item Total: $
                  {(
                    item.price * item.quantity
                  ).toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      handleDecrease(item)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleIncrease(item)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    handleRemove(item.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-buttons">
        <button
          onClick={() => {
            window.location.href = "/products";
          }}
        >
          Continue Shopping
        </button>

        <button
          onClick={() =>
            alert("Coming Soon!")
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
