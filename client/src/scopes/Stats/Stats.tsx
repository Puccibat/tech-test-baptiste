import React, { useState } from "react";
import { IOrderState, useOrderContext } from "../../contexts/OrderContext";
import UsersChart from "./UsersChart";
import "./Stats.css";

const Stats = () => {
  const { orders } = useOrderContext();
  const [givenDate, setGivenDate] = useState<string>(null);

  const priceOrdersArr: number[] = orders.map((order): number => {
    return order.price;
  });

  const reducePrice = (orderPricericeArray: number[]): number => {
    let convertedArr: number[] = [];
    let result: number;
    orderPricericeArray.forEach((price) => {
      convertedArr.push(Number(price));
    });
    result = convertedArr.reduce(
      (accumulator, currenValue) => accumulator + currenValue,
      0
    );
    return result;
  };

  const filterOrderByDate = (arrOrders: IOrderState[], expiration: string) => {
    return arrOrders.filter(
      (order) => order.expirationdate.split("T")[0] === expiration
    );
  };

  const averageOrder = reducePrice(priceOrdersArr) / priceOrdersArr.length;

  return (
    <div className="stats-section">
      <div>
        <h2>Some stats</h2>
        <ul>
          <li>
            Average order: <span className="dataStats">{averageOrder}</span>
          </li>
          <li>
            {" "}
            <input
              type="date"
              onChange={(e) => {
                setGivenDate(e.target.value);
              }}
            />
          </li>
          <li>
            Sum of orders expiring at this date:{" "}
            <span className="dataStats">
              {reducePrice(
                filterOrderByDate(orders, givenDate).map((order) => order.price)
              )}
            </span>
          </li>
        </ul>
      </div>
      <UsersChart />
    </div>
  );
};

export default Stats;
