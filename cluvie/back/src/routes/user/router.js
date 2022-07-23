import { Router } from "express";
import { userService } from "./service";
import { verifyToken } from "../../middlewares/verifyToken";

const userRouter = Router();

// 공통 url: "/users"

// 회원가입
userRouter.post("/", async (req, res) => {
  try {
    const { email, password, nickname, birthday, sex } = req.body;
    const user = await userService.register({
      email,
      password,
      nickname,
      birthday,
      sex,
    });

    if (user.errorMessage) {
      res.status(403).json({ success: false, err: user.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 로그인
userRouter.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login({ email, password });

    if (token.errorMessage) {
      res.status(403).json({ success: false, err: token.errorMessage });
      return;
    }
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 사용자 정보 GET
userRouter.get("/", verifyToken, async (req, res) => {
  try {
    const id = req.user;
    const user = await userService.getUserData({ id });

    if (user.errorMessage) {
      res.status(403).json({ success: false, err: user.errorMessage });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 회원정보 수정(nickname, description)
userRouter.patch("/", verifyToken, async (req, res) => {
  try {
    const { nickname, description } = req.body;
    const id = req.user;
    const userUpdated = await userService.userDataUpdate({
      id,
      nickname,
      description,
    });
    if (userUpdated.errorMessage) {
      res.status(403).json({ success: false, err: userUpdated.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 비로그인 상태에서 클럽 매니저의 닉네임을 보여주기 위한 라우터(프론트 요청)
userRouter.get("/:user_id/nickname", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const userNickname = await userService.getUserNickname({ user_id });
    res.status(200).json({ success: true, userNickname });
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
});

export default userRouter;
