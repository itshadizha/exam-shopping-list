import React from "react";
import PurchaseItem from "./PurchaseItem";
import { useSelector } from "react-redux";

const PurchseList = () => {
  const { purchases } = useSelector((state) => state.purchases);
  console.log(purchases);

  return (
    <div>
      {purchases.map((purchase) => (
        <PurchaseItem {...purchase} key={purchase.id} />
      ))}
    </div>
  );
};

export default PurchseList;
