import express from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { applicantService } from "./service";

const applicantRouter = express.Router();

// 공통 url: "/applications"

// 모임 신청 status
// status: 0 (신청중)
// status: 1 (수락)
// status: 2 (수락받지 못하고 모임 모집 마감 -> 거절)

// 모임 신청하기
applicantRouter.post("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const club_id = req.body.club_id;

    const applicated = await applicantService.application({ user_id, club_id });

    if (applicated.errorMessager) {
      res.status(403).json({ success: false, err: applicated.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 모임 신청 취소
applicantRouter.delete("/:club_id", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const club_id = req.params.club_id;

    const canceled = await applicantService.cancelApplication({
      user_id,
      club_id,
    });

    if (canceled.errorMessager) {
      res.status(403).json({ success: false, err: canceled.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 내가 신청한 모임 목록
applicantRouter.get("/clubs", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const applyingClubList = await applicantService.getApplyingClubs({
      user_id,
    });

    if (applyingClubList.errorMessager) {
      res
        .status(403)
        .json({ success: false, err: applyingClubList.errorMessage });
      return;
    }
    res.status(200).json({ success: true, applyingClubList });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 모임 신청자 목록
applicantRouter.get("/:club_id/users", verifyToken, async (req, res) => {
  try {
    const club_id = req.params.club_id;

    const applicants = await applicantService.getApplicants({
      club_id,
    });

    if (applicants.errorMessager) {
      res.status(403).json({ success: false, err: applicants.errorMessage });
      return;
    }
    res.status(200).json({ success: true, applicants });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 모임 신청 수락하기
applicantRouter.patch("/acceptance", verifyToken, async (req, res) => {
  try {
    // 모임장이 수락하고자 하는 유저의 id
    const user_id = req.body.user_id;
    const club_id = req.body.club_id;

    const accepted = await applicantService.acceptance({ user_id, club_id });

    if (accepted.errorMessager) {
      res.status(403).json({ success: false, err: accepted.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 모임 신청 수락 취소하기
applicantRouter.patch("/refuse", verifyToken, async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const club_id = req.body.club_id;

    const canceled = await applicantService.cancelAcceptance({
      user_id,
      club_id,
    });

    if (canceled.errorMessager) {
      res.status(403).json({ success: false, err: canceled.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 유저가 가입된(수락완료된) 모임 목록
applicantRouter.get("/acceptance/clubs", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;

    const myClubList = await applicantService.getMyclubList({ user_id });

    res.status(200).json({ success: true, myClubList });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

module.exports = applicantRouter;
