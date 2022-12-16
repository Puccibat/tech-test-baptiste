import { useState } from "react";
import { useOrderContext } from "../contexts/OrderContext";

export const useOrder = () => {
  const { setOrders, addOrder, deleteOrder, editOrder } = useOrderContext();

  const getOrders = async () => {
    const response = await fetch("/api/order/orders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (response.ok) {
      setOrders(json);
    }
  };

  const addNewOrder = async (price: number, username: string) => {
    const order = {
      price,
      username,
      expirationdate: new Date(),
    };

    const response = await fetch("/api/order/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const json = await response.json();

    if (response.ok) {
      addOrder(json);
    }
  };

  const removeOrder = async (
    token: string,
    user_id: number,
    order_id: number
  ) => {
    const response = await fetch(`/api/order/delete/${order_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, user_id }),
    });
    const json = await response.json();

    if (response.ok) {
      deleteOrder(json);
    }
  };

  const modifyOrder = async (
    token: string,
    price: number,
    order_id: number,
    user_id: number
  ) => {
    const response = await fetch(`/api/order/edit/${order_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price, token, user_id }),
    });
    const json = await response.json();

    if (response.ok) {
      editOrder(json);
    }
  };

  return { getOrders, addNewOrder, removeOrder, modifyOrder };
};
