import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useOrder } from "../../hooks/useOrder";
import { IOrderState } from "../../contexts/OrderContext";

type PropsOrderItem = {
  order: IOrderState;
  setToggleUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  toggleUpdateList: boolean;
};

const OrderItem = (props: PropsOrderItem) => {
  const { user } = useAuthContext();
  const { removeOrder, modifyOrder } = useOrder();
  const [toggleEditPrice, setToggleEditPrice] = useState<boolean>(false);
  const [editOrderId, setEditOrderId] = useState<number>();
  const [editPriceOrder, setEditPriceOrder] = useState<number>();
  const username = user.username;

  const handleRemoveOrder = (order_id: number) => {
    removeOrder(user.token, user.user_id, order_id);
    props.setToggleUpdateList(!props.toggleUpdateList);
  };

  const handleEditOrder = (order_id: number) => {
    modifyOrder(user.token, editPriceOrder, order_id, user.user_id);
    setToggleEditPrice(false);
    setEditPriceOrder(0);
    props.setToggleUpdateList(!props.toggleUpdateList);
  };

  return (
    <tr>
      <td>{props.order.username}</td>
      <td>
        <td>
          {toggleEditPrice && editOrderId === props.order.order_id ? (
            <>
              <input
                className="inputPrice"
                type="number"
                value={editPriceOrder}
                onChange={(e) => {
                  setEditPriceOrder(parseInt(e.target.value));
                }}
              />
              <button
                className="btn btn-edit"
                onClick={() => handleEditOrder(props.order.order_id)}
                disabled={!editPriceOrder}
              >
                Save
              </button>
            </>
          ) : (
            props.order.price
          )}
        </td>
      </td>
      <td>{props.order.expirationdate.split("T")[0]}</td>
      <td>
        {username === props.order.username ? (
          <button
            className="btn btn-delete"
            onClick={() => handleRemoveOrder(props.order.order_id)}
          >
            X
          </button>
        ) : null}
      </td>
      <td>
        {username === props.order.username ? (
          <button
            className="btn btn-edit"
            onClick={() => {
              setToggleEditPrice(!toggleEditPrice);
              setEditOrderId(props.order.order_id);
            }}
          >
            Edit
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default OrderItem;
