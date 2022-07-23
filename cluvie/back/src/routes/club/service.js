import Reviews from "../../../models/review";
import Likes from "../../../models/like";
import Users from "../../../models/user";
import Clubs from "../../../models/club";
import Applicants from "../../../models/applicant";
import Ratings from "../../../models/rating";
import db from "../../../models/index";

class clubService {
  static uploadPictures = async (req, res) => {
    const picture = req.file;
    return picture.location;
  };
  static createClub = async ({
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
  }) => {
    const club = await Clubs.create({
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
    return club;
  };

  static createClubReviewRating = async (club_id) => {
    const reviewRating = await Ratings.create({ club_id });
    return reviewRating;
  };

  // 비로그인 -> 메인페이지(로그인 안해도 전체 클럽목록 볼 수 있어서)
  static getClublist = async (club_id) => {
    const clubList = await Clubs.findAll({});
    console.log("확인:", club_id);

    let sql = `SELECT * FROM clubs WHERE id <= ${club_id} ORDER BY id DESC LIMIT 6`;
    const scrollClubList = await db.sequelize.query(sql, {
      type: db.sequelize.QueryTypes.SELECT,
    });
    console.log(scrollClubList);
    return scrollClubList;
  };

  // 로그인 후 -> 메인페이지(전체 클럽 목록 GET)
  // 로그인된 유저의 모임 찜 여부 확인
  static getClubListTest = async ({ user_id, club_id }) => {
    let sql = `SELECT l.user_id, c.id, c.name, c.manager, c.picture, c.intro, c.duration, c.state, c.online, c.offline, c.description, c.views, c.head_count, c.weekday, c.weekend, c.hashtag1, c.hashtag2, c.created_at, c.updated_at FROM clubs AS c LEFT JOIN (SELECT * FROM likes WHERE user_id=${user_id}) AS l ON c.id = l.club_id WHERE c.id < ${club_id} ORDER BY id DESC LIMIT 6`;
    const clubs = await db.sequelize.query(sql, {
      type: db.sequelize.QueryTypes.SELECT,
    });
    // 클럽목록 배열로 보낼 때, 로그인한 유저의 모임 찜 여부를 user_id: 0 or 1 로 표현
    const clubListView = clubs.map((club) => {
      if (club.user_id != null) {
        return { ...club, user_id: 1 };
      } else {
        return { ...club, user_id: 0 };
      }
    });
    return clubListView;
  };

  static getClubListMadeByMe = async ({ user_id }) => {
    const clubList = await Clubs.findAll({ where: { manager: user_id } });
    return { clubList };
  };

  static getClubDetail = async ({ club_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    let sql = `SELECT description FROM clubs WHERE id = ${club_id};`;
    const clubDetail = await db.sequelize.query(sql, {
      type: db.sequelize.QueryTypes.SELECT,
    });
    console.log(clubDetail);
    return clubDetail;
  };

  static closeApplication = async ({ club_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    if (!club) {
      const errorMessage = "존재하지 않는 모임입니다.";
      return { errorMessage };
    }
    const closeApplication = await club.update({ state: 1 });
    await Applicants.update({ status: 2 }, { where: { club_id, status: 0 } });
    return closeApplication;
  };

  static deleteClub = async ({ club_id, user_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    if (!club) {
      const errorMessage = "존재하지 않는 모임입니다.";
      return { errorMessage };
    }
    if (club.manager != user_id) {
      const errorMessage = "삭제 권한이 없습니다.";
      return { errorMessage };
    }
    // 클럽에 관련된 찜하기, 후기, 신청자 모두 삭제
    const deleted = await Clubs.destroy({ where: { id: club_id } });
    await Likes.destroy({ where: { club_id: club_id } });
    await Reviews.destroy({ where: { club_id: club_id } });
    await Ratings.destroy({ where: { club_id: club_id } });
    await Applicants.destroy({ where: { club_id: club_id } });
    return deleted;
  };

  static writeReview = async ({ user_id, club_id, star_rating, contents }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    const user = await Users.findOne({ where: { id: user_id } });
    if (!club) {
      const errorMessage = "존재하지 않는 모임입니다.";
      return { errorMessage };
    }
    if (!user) {
      const errorMessage = "해당 사용자를 찾을 수 없습니다";
      return { errorMessage };
    } else {
      const review = await Reviews.create({
        user_id,
        club_id,
        star_rating,
        contents,
      });
      return review;
    }
  };

  static getAllReviews = async ({ club_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    if (!club) {
      const errorMessage = "존재하지 않는 모임입니다.";
      return { errorMessage };
    }
    const reviews = await db.sequelize.query(
      `SELECT u.id, u.nickname, r.club_id, r.star_rating, r.contents, r.created_at FROM reviews AS r LEFT JOIN users AS u ON r.user_id = u.id WHERE r.club_id=${club_id} ORDER BY r.created_at DESC`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    return reviews;
  };

  static setReviewRating = async ({ club_id, star }) => {
    const rating = await Ratings.findOne({ where: { club_id: club_id } });
    await rating.increment({ count: 1 });
    await rating.increment("star_sum", {
      by: star,
    });
  };

  static calculateRating = async ({ club_id }) => {
    const ratingData = await Ratings.findOne({ where: { club_id: club_id } });
    const rating = ratingData.star_sum / ratingData.count;

    const result = await ratingData.update({ rating: rating });
    return result;
  };

  static getRating = async ({ club_id }) => {
    const ratingData = await Ratings.findOne({ where: { club_id } });
    return ratingData.rating.toFixed(1); //소수점 한자리까지 표현
  };

  static getTop10ViewsRecruitingClubs = async () => {
    const clubs = await db.sequelize.query(
      `SELECT * FROM clubs WHERE state = 0 ORDER BY views DESC LIMIT 10`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    return clubs;
  };

  static getTop10PopularClubs = async () => {
    const clubs = await db.sequelize.query(
      `SELECT * FROM (SELECT c.id, c.name, c.manager, c.picture, c.intro, c.duration, c.state, c.online, c.offline, c.description, c.views, c.head_count, c.weekday, c.weekend, c.hashtag1, c.hashtag2, c.created_at, c.updated_at, IFNULL((c.head_count - a.member_count), 0) AS capacity FROM clubs AS c LEFT JOIN (SELECT club_id, COUNT(user_id) AS member_count FROM applicants WHERE STATUS = 1 AND is_deleted <> 1 GROUP BY club_id) AS a ON c.id = a.club_id WHERE c.is_deleted <> 1) AS b WHERE b.capacity > 0 ORDER BY b.capacity LIMIT 10`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    return clubs;
  };

  static getWeekendRecruitingClubs = async () => {
    const clubs = await db.sequelize.query(
      `SELECT * FROM clubs WHERE state=0 AND weekend=1 ORDER BY RAND() LIMIT 10`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    return clubs;
  };
}
export { clubService };
