import React, { useEffect, useState } from "react";
import "./Trade.css";

import { useOrder } from "../../hooks/useOrder";
import { useOrderContext } from "../../contexts/OrderContext";
import OrderItem from "./OrderItem";

const OrdersList = () => {
  const { orders } = useOrderContext();
  const { getOrders } = useOrder();
  const [toggleUpdateList, setToggleUpdateList] = useState<boolean>(false);

  useEffect(() => {
    getOrders();
  }, [toggleUpdateList]);

  return (
    <div>
      {" "}
      <table className="content-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Price</th>
            <th>Expiration</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {orders ? (
            orders.map((order) => {
              return (
                <OrderItem
                  order={order}
                  setToggleUpdateList={setToggleUpdateList}
                  toggleUpdateList={toggleUpdateList}
                  key={order.order_id}
                />
              );
            })
          ) : (
            <tr>
              <td>{`Pas d'infos`}</td>
              <td>{`Pas d'infos`}</td>
              <td>{`Pas d'infos`}</td>
              <td>{`Pas d'infos`}</td>
              <td>{`Pas d'infos`}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
