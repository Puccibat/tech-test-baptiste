import React from "react";
import { useOrderContext } from "../../contexts/OrderContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const UsersChart = () => {
  const { orders } = useOrderContext();

  const users = Array.from(new Set(orders.map((order) => order.username)));

  const ordersSum: number[] = users.map((user) =>
    orders
      .filter((order) => order.username === user)
      .map((result) => Number(result.price))
      .reduce((ac, cur) => ac + cur, 0)
  );

  const randomColorArr: string[] = users.map(() => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  });

  const data = {
    labels: users,
    datasets: [
      {
        label: "Orders spliting",
        data: ordersSum,
        backgroundColor: randomColorArr,
        width: 300,
      },
    ],
  };

  return (
    <div className="pieChart">
      <h2>Distribution of purchasers </h2>
      <Pie data={data}></Pie>
    </div>
  );
};

export default UsersChart;
