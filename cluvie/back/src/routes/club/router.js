import express from "express";
import Clubs from "../../../models/club";
import { clubService } from "./service";
import { verifyToken } from "../../middlewares/verifyToken";
import { upload } from "../../middlewares/fileUpload";
import axios from "axios";

const clubRouter = express.Router();

// 공통 url: "/clubs"

// 클럽 사진 서버에 업로드
clubRouter.post("/picture", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const filePath = file.location;
    return res.json({ success: true, filePath });
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
});

/** 클럽 생성 */
clubRouter.post("/", verifyToken, async (req, res) => {
  try {
    const {
      name,
      intro,
      online,
      offline,
      description,
      head_count,
      picture,
      weekday,
      weekend,
      duration,
      hashtag1,
      hashtag2,
    } = req.body;
    const manager = req.user;

    const club = await clubService.createClub({
      name,
      intro,
      online,
      offline,
      description,
      head_count,
      picture,
      weekday,
      weekend,
      duration,
      manager,
      hashtag1,
      hashtag2,
    });

    const club_id = club.id;
    const club_description = club.description;
    await clubService.createClubReviewRating(club_id);
    // NER API로 보내주기
    const response = await axios.post(
      "http://kdt-ai4-team18.elicecoding.com:5002/ner",
      { sentences: club_description, id: club_id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    const nerResult = response.data;
    res.status(200).json({ success: true, nerResult });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

/** 전체 클럽 목록 불러오기 */
clubRouter.get("/", async (req, res) => {
  await Clubs.findAll({})
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
      console.log(err);
    });
});

// 메인페이지는 로그인 안하고 볼 수 있음 -> 로그인하고나서의 메인페이지 라우터
// 클럽 목록 불러오기 6개씩(로그인한 유저의 좋아요 여부 포함)
clubRouter.get(
  "/isLogined/scrollClublist/:club_id",
  verifyToken,
  async (req, res) => {
    try {
      const user_id = req.user;
      const club_id = req.params.club_id;
      const scrollClublist = await clubService.getClubListTest({
        user_id,
        club_id,
      });
      res.status(200).json({ success: true, scrollClublist });
    } catch (err) {
      res.send({ success: false, message: err.message });
    }
  }
);

// NER -> SEARCH 검색어 입력
clubRouter.post("/searchResults", async (req, res) => {
  try {
    const { searchWord } = req.body;
    const response = await axios.post(
      "http://kdt-ai4-team18.elicecoding.com:5002/search",
      { sentences: searchWord },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    const searchResults = response.data;
    res.json({ searchResults });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// NER -> SEARCH 검색결과 가져오기
clubRouter.get("/searchResults/:searchWord", async (req, res) => {
  try {
    const searchWord = req.params.searchWord;
    const response = await axios.post(
      "http://kdt-ai4-team18.elicecoding.com:5002/search",
      { sentences: searchWord },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    const searchResults = response.data;
    res.json({ searchResults });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

/** 클럽 4개씩 불러오기
 * @param club_id 가장 최근 클럽ID
 */
clubRouter.get("/scrollClublist/:club_id", async (req, res, next) => {
  try {
    const currentClubId = req.params.club_id;
    const scrollClublist = await clubService.getClublist(currentClubId);
    res.json({ success: true, scrollClublist });
  } catch (err) {
    next(err);
  }
});

// 모집중인 모임 중 조회수 상위 10개 모임 불러오기
clubRouter.get("/top10Views", async (req, res) => {
  try {
    const top10Views = await clubService.getTop10ViewsRecruitingClubs();
    res.status(200).json({ success: true, top10Views });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 모집중인 모임 중 마감임박 10개 모임 불러오기
clubRouter.get("/popularTop10", async (req, res) => {
  try {
    const popularTop10 = await clubService.getTop10PopularClubs();
    res.status(200).json({ success: true, popularTop10 });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 모집중인 모임 중 주말에 모이는 모임 10개 랜덤으로 불러오기
clubRouter.get("/weekend", async (req, res) => {
  try {
    const weekend = await clubService.getWeekendRecruitingClubs();
    res.status(200).json({ success: true, weekend });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 모임 모집 마감하기
clubRouter.patch("/close", verifyToken, async (req, res) => {
  try {
    const club_id = req.body.club_id;
    const closeApplication = await clubService.closeApplication({ club_id });

    if (closeApplication.errorMessage) {
      res
        .status(403)
        .json({ success: false, err: closeApplication.errorMessage });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
});

// 유저가 만든 모임 목록
clubRouter.get("/user", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;

    const clubList = await clubService.getClubListMadeByMe({ user_id });

    res.status(200).json({ success: true, clubList });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 모임 참여 후기 작성
clubRouter.post("/:club_id/review", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const club_id = req.params.club_id;
    const { star_rating, contents } = req.body;

    const review = await clubService.writeReview({
      club_id,
      user_id,
      star_rating,
      contents,
    });
    const star = review.star_rating;
    await clubService.setReviewRating({ club_id, star });
    await clubService.calculateRating({ club_id });

    if (review.errorMessage) {
      res.status(403).json({ success: false, err: review.errorMessage });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    if (err.message == "Validation error") {
      res.status(403).json({
        success: false,
        message: "모임 후기는 한 번만 작성할 수 있습니다",
      });
    } else {
      res.json({ success: false, message: err.message });
    }
  }
});

clubRouter.get("/search", async (req, res) => {
  try {
    const searchWord = req.body.searchWord;
    res.json({ searchWord });
  } catch (err) {
    res.json({ message: err.message });
  }
});

// 모임 참여 후기 목록 불러오기(비로그인으로 가능)
clubRouter.get("/:club_id/review", async (req, res) => {
  try {
    const club_id = req.params.club_id;
    const reviews = await clubService.getAllReviews({ club_id });

    if (reviews.errorMessage) {
      res.status(403).json({ success: false, err: reviews.errorMessage });
    }
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//모임 후기 평점 불러오기
clubRouter.get("/:club_id/rating", async (req, res) => {
  try {
    const club_id = req.params.club_id;
    const rating = await clubService.getRating({ club_id });

    res.status(200).json({ success: true, rating });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

/** 클럽 1개씩 불러오기
 * @param id 클럽ID
 */
clubRouter.get("/:id", async (req, res, next) => {
  try {
    const club = await Clubs.findOne({ where: { id: req.params.id } });
    if (!club) {
      return res.json({ success: false, message: "존재하지 않는 모임입니다." });
    }
    await club.increment({ views: 1 }, { where: { id: req.params.id } });

    res.status(200).json({ success: true, club });
  } catch (err) {
    next(err);
  }
});

/** 클럽 수정
 * @param id 클럽ID
 */
clubRouter.put("/:id", verifyToken, async (req, res) => {
  const club = await Clubs.findOne({ where: { id: req.params.id } });
  if (!club) {
    return res.json("존재하지 않는 모임입니다.");
  }
  let {
    name,
    intro,
    online,
    offline,
    description,
    head_count,
    picture,
    weekday,
    weekend,
    duration,
    state,
    hashtag1,
    hashtag2,
  } = req.body;
  await Clubs.update(
    {
      name,
      intro,
      online,
      offline,
      description,
      head_count,
      picture,
      weekday,
      weekend,
      duration,
      state,
      hashtag1,
      hashtag2,
    },
    { where: { id: req.params.id } }
  )
    .then((result) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
});

/** 클럽 삭제
 * @param id 클럽ID
 */
// 없는 모임을 삭제할 경우, 에러 처리
clubRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const club_id = req.params.id;
    const deletedClub = await clubService.deleteClub({ club_id, user_id });

    if (deletedClub.errorMessage) {
      res.status(403).json({ success: false, err: deletedClub.errorMessage });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = clubRouter;
