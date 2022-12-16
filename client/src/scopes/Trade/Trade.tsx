import React, { useState } from "react";
import "./Trade.css";
import { useOrder } from "../../hooks/useOrder";
import { useAuthContext } from "../../contexts/AuthContext";
import Stats from "../Stats/Stats";
import OrdersList from "./OrdersList";

export default function Trade() {
  const { user } = useAuthContext();
  const { addNewOrder } = useOrder();
  const [price, setPrice] = useState(0);

  const username = user.username;

  const handleSubmit = () => {
    addNewOrder(price, username);
  };

  return (
    <div className="Trade">
      <div>
        <div className="control">
          <div>
            <label htmlFor="Price">Price: </label>
            <input
              className="inputPrice"
              type="number"
              id="price"
              onChange={(e) => {
                setPrice(parseInt(e.target.value));
              }}
              value={price}
            />
          </div>
          <button
            className="btn btn-buy"
            onClick={handleSubmit}
          >{`Buy an order and HOLD !!!!`}</button>
        </div>
        <OrdersList />
      </div>
      <Stats />
    </div>
  );
}
