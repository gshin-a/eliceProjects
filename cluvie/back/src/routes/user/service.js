import Users from "../../../models/user";
import { hashPassword } from "../../utils/hashPassword";
import { makeToken, makeRefreshToken } from "../../utils/makeToken";
import dotenv from "dotenv";
dotenv.config();

class userService {
  static emailAuthentication = async ({ email, key }) => {
    const user = await Authentications.findOne({ email });
    const number = user.number;
    if (number != key) {
      const errorMessage = "인증번호가 일치하지 않습니다.";
      return { errorMessage };
    } else {
      return user;
    }
  };

  static emailAuthenticationDelete = async (user) => {
    await Users.destroy({ user });
    return;
  };

  static register = async ({ email, password, nickname, birthday, sex }) => {
    const hashedPassword = hashPassword(password);
    const duplicateEmmail = await Users.findOne({
      where: { email },
    });
    const duplicateNickname = await Users.findOne({ where: { nickname } });
    if (duplicateEmmail) {
      const errorMessage = "중복된 이메일 입니다";
      return { errorMessage };
    }
    if (duplicateNickname) {
      const errorMessage = "중복된 닉네임 입니다";
      return { errorMessage };
    } else {
      const user = await Users.create({
        email,
        password: hashedPassword,
        nickname,
        birthday,
        sex,
      });
      return user;
    }
  };
  static login = async ({ email, password }) => {
    let user = await Users.findOne({
      where: { email },
    });
    const hashedPassword = hashPassword(password);
    if (!user) {
      // 가입여부 확인
      const errorMessage = "해당 아이디로 가입된 사용자가 없습니다";
      return { errorMessage };
    } else if (user.password === hashedPassword) {
      // 비밀번호 일치 확인
      const token = makeToken({ userId: user.id });
      const refreshToken = makeRefreshToken({ userId: user.id });
      await user.update(
        { refresh_token: refreshToken },
        { where: { id: user.id } }
      );
      return token;
    } else {
      const errorMessage = "비밀번호가 틀립니다";
      return { errorMessage };
    }
  };
  static userDataUpdate = async ({ id, nickname, description }) => {
    const user = await Users.findOne({
      where: { id },
    });
    if (!user) {
      const errorMessage = "해당 사용자를 찾을 수 없습니다";
      return { errorMessage };
    } else {
      const updated = await Users.update(
        { nickname, description },
        { where: { id } }
      );
      return updated;
    }
  };

  static getUserData = async ({ id }) => {
    const user = await Users.findOne({
      where: { id },
    });
    if (!user) {
      const errorMessage = "해당 사용자를 찾을 수 없습니다";
      return { errorMessage };
    } else {
      return user;
    }
  };

  static getUserNickname = async ({ user_id }) => {
    const user = await Users.findOne({ where: { id: user_id } });
    return user.nickname;
  };
}

export { userService };
