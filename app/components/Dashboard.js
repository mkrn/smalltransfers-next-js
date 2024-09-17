"use client";

import React, { useState, useEffect } from "react";
import PayButton from "./PayButton";
import { getSession } from "../actions";

const Dashboard = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        {session?.isLoggedIn ? (
          <PayButton amountMicros={10000} />
        ) : (
          <h2 className="text-2xl font-bold">
            Welcome! Please sign in to make a payment.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
