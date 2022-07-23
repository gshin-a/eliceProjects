import { Router } from "express";
import { likeService } from "./service";
import { verifyToken } from "../../middlewares/verifyToken";

const likeRouter = Router();

// 공통 url: "/likes"

// 모임 찜하기 -> 똑같은 모임 또 찜 누르면 오류 응답
likeRouter.post("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const club_id = req.body.club_id;

    const like = await likeService.clickLike({ user_id, club_id });

    if (like.errorMessage) {
      res.status(403).json({ success: false, err: like.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 모임 찜하기 해제
likeRouter.delete("/:club_id", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const club_id = req.params.club_id;

    const unlike = await likeService.unlike({ user_id, club_id });

    if (unlike.errorMessage) {
      res.status(403).json({ success: false, err: unlike.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 사용자가 찜한 모임 목록 GET
likeRouter.get("/clubs", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const likeClubList = await likeService.getUserLikeClub({ user_id });

    if (likeClubList.errorMessage) {
      res.status(403).json({ success: false, err: likeClubList.errorMessage });
      return;
    }
    res.status(200).json({ success: true, likeClubList });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

export default likeRouter;
