import jwt from "jsonwebtoken";
import Users from "../../models/user";

import dotenv from "dotenv";
dotenv.config();

// status code
// 401 : access token 만료->토큰 재발급
// 402 : 아예 refreshToken 만료 -> 새로 로그인 필요
// 403 : 토큰 없음(로그인 안된 상태)

const checkToken = (token, keyType) => {
  try {
    return jwt.verify(token, keyType);
  } catch (err) {
    return err.message;
  }
};

const verifyToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    res.status(403).json({
      success: false,
      message: "token이 없습니다",
    });
    return;
  }
  const accessToken = req.headers["authorization"].split(" ")[1];

  try {
    const ACCESS_KEY = process.env.JWT_SECRET_KEY;
    const REFRESH_KEY = process.env.REFRESH_SECRET_KEY;
    const myAccessToken = checkToken(accessToken, ACCESS_KEY);

    if (myAccessToken == "jwt expired") {
      // acceess token 만료
      const userInfo = jwt.decode(accessToken, ACCESS_KEY);

      const userId = userInfo.userId;
      Users.findOne({ where: { id: userId } }).then((user) => {
        const refreshToken = user.refresh_token;
        const myRefreshToken = checkToken(refreshToken, REFRESH_KEY);
        if (myRefreshToken == "jwt expired") {
          res.status(402).json({
            success: false,
            message: "토큰 만료, 로그인이 필요합니다",
          });
        } else {
          const myNewAccessToken = jwt.sign({ userId }, ACCESS_KEY, {
            expiresIn: "2h",
          });
          res.status(401).json({ success: false, myNewAccessToken });
        }
      });
    } else {
      const decoded = jwt.verify(accessToken, ACCESS_KEY);
      // req에 해독한 user 정보 생성
      req.user = decoded.userId;
      next();
    }
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
    next(err);
  }
};

export { verifyToken };
