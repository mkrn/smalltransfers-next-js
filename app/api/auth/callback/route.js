import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "../../../lib";

const host = process.env.VERCEL_URL.startsWith("localhost")
  ? "http://" + process.env.VERCEL_URL + ":" + process.env.PORT
  : `https://${process.env.VERCEL_URL}`;

async function handler(req) {
  const { searchParams } = new URL(req.url);
  const authorizationCode = searchParams.get("code");

  const session = await getIronSession(cookies(), sessionOptions);

  if (authorizationCode) {
    try {
      const response = await fetch(
        "https://smalltransfers.com/api/v1/oauth/tokens",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grantType: "authorization_code",
            publishableKey:
              process.env.NEXT_PUBLIC_SMALLTRANSFERS_PUBLISHABLE_KEY,
            secretKey: process.env.SMALLTRANSFERS_SECRET_KEY,
            authorizationCode: authorizationCode,
            redirectUrl: `${host}/api/auth/callback`,
          }),
        }
      );

      if (response.ok) {
        const { accessToken, customer } = await response.json();
        const { id, firstName, lastName, email, live } = customer;
        const user = { id, firstName, lastName, email, live };

        session.user = user;
        session.accessToken = accessToken;
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.redirect(`${host}`);
      } else {
        const { message } = await response.json();
        throw new Error(`Failed to obtain authentication tokens: ${message}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      return NextResponse.redirect(`${host}/?error=authentication_failed`);
    }
  } else {
    return NextResponse.redirect(`${host}/?error=missing_code`);
  }
}

export const GET = handler;
