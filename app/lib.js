export const sessionOptions = {
  password: process.env.SMALLTRANSFERS_PASSWORD,
  cookieName: "smalltransfers",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: false,
  },
};

export const defaultSession = {
  isLoggedIn: false,
};
