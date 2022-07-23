import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const makeToken = (Object) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(Object, jwtkey, { expiresIn: "2h" });
  return token;
};
const makeRefreshToken = (Object) => {
  const jwtkey = process.env.REFRESH_SECRET_KEY;
  const token = jwt.sign(Object, jwtkey, { expiresIn: "14d" });
  return token;
};

export { makeToken, makeRefreshToken };
