"use client";

import React from "react";
import { getSession, logout } from "../actions";
import { useEffect, useState } from "react";

export const SignInButton = () => {
  const publishableKey = process.env.NEXT_PUBLIC_SMALLTRANSFERS_PUBLISHABLE_KEY;
  const callbackUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth/callback`
      : "";

  const handleLogin = () => {
    const authorizationUrl = `https://smalltransfers.com/customer/authorize?publishable_key=${publishableKey}&redirect_url=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&scope=charge`;
    window.location.href = authorizationUrl;
  };

  return (
    <button onClick={handleLogin} className="bg-blue-500 px-4 py-2 rounded">
      Sign In with SmallTransfers
    </button>
  );
};

const Header = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">My App</h1>
      <div>
        {session?.isLoggedIn ? (
          <>
            <span className="mr-4">Hello, {session?.user?.firstName}</span>
            <button
              onClick={async () => {
                await logout();
                window.location.reload();
              }}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  );
};

export default Header;
