"use client";

import React, { useState } from "react";
import { pay } from "../actions";

const PayButton = ({ amountMicros }) => {
  const [isPaid, setIsPaid] = useState(false);

  const handlePay = async () => {
    try {
      const result = await pay(amountMicros);
      if (result.success) {
        setIsPaid(true);
        setTimeout(() => setIsPaid(false), 2000); // Reset after 2 seconds
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <button
      className={`text-4xl font-bold ${
        isPaid
          ? "bg-green-500 hover:bg-green-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white px-8 py-4 rounded-lg shadow-lg transition-colors duration-300`}
      onClick={handlePay}
      disabled={isPaid}
    >
      {isPaid ? "Paid!" : "Pay $0.01"}
    </button>
  );
};

export default PayButton;
