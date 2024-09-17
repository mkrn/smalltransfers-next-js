"use server";

import { defaultSession, sessionOptions } from "@/app/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession() {
  const session = await getIronSession(cookies(), sessionOptions);

  // If user visits for the first time session returns an empty object.
  // Let's add the isLoggedIn property to this object and its value will be the default value which is false
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return JSON.parse(JSON.stringify(session));
}

export async function logout() {
  const session = await getIronSession(cookies(), sessionOptions);
  session.isLoggedIn = defaultSession.isLoggedIn;
  await session.save();
}

export async function pay(amountMicros) {
  const session = await getSession();
  const { accessToken } = session;

  const response = await fetch(
    "https://smalltransfers.com/api/v1/transactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publishableKey: process.env.NEXT_PUBLIC_SMALLTRANSFERS_PUBLISHABLE_KEY,
        secretKey: process.env.SMALLTRANSFERS_SECRET_KEY,
        accessToken: accessToken,
        amountMicros,
      }),
    }
  );

  if (response.ok) {
    // Run your service here.
    return { success: true };
  } else {
    const { message } = await response.json();
    throw new Error(`Failed to charge the account: ${message}`);
  }
}
