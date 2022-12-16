import React, { createContext, useContext, useReducer } from "react";
import { ActionTypes } from "./actions";

type Actions<T> = {
  type: T;
  payload?: any;
  meta?: any;
};

export interface IOrderState {
  order_id: number;
  price: number;
  expirationdate: string;
  username: string;
}

type IOrdersState = {
  orders: IOrderState[] | null;
};

interface IOrderContext {
  setOrders: (orders: IOrdersState) => void;
  addOrder: (order: IOrderState) => void;
  deleteOrder: (order_id: number) => void;
  editOrder: (order_id: number) => void;
}

const initialState: IOrdersState = {
  orders: [],
};

const OrderContext = createContext<IOrdersState & IOrderContext>({
  ...initialState,
  setOrders: () => {},
  addOrder: () => {},
  deleteOrder: () => {},
  editOrder: () => {},
});

export const OrderReducer = (
  state: IOrdersState,
  action: Actions<ActionTypes>
) => {
  switch (action.type) {
    case ActionTypes.SET_ORDERS:
      return { ...state, orders: action?.payload };
    case ActionTypes.ADD_ORDERS:
      return { ...state, orders: [action?.payload, ...state.orders] };
    case ActionTypes.DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.order_id !== action.payload.order_id
        ),
      };
    case ActionTypes.EDIT_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.order_id === action.payload.order_id) {
            return { ...order, price: action.payload.price };
          }
          return order;
        }),
      };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  return (
    <OrderContext.Provider
      value={{
        ...state,
        setOrders: (orders) =>
          setImmediate(() =>
            dispatch({ type: ActionTypes.SET_ORDERS, payload: orders })
          ),
        addOrder: (order) =>
          setImmediate(() =>
            dispatch({ type: ActionTypes.ADD_ORDERS, payload: order })
          ),
        deleteOrder: (orders) =>
          setImmediate(() =>
            dispatch({ type: ActionTypes.DELETE_ORDER, payload: orders })
          ),
        editOrder: (orders) =>
          setImmediate(() =>
            dispatch({ type: ActionTypes.EDIT_ORDER, payload: orders })
          ),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
