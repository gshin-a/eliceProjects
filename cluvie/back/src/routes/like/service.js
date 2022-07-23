import db from "../../../models/index";
import Likes from "../../../models/like";
import Clubs from "../../../models/club";
import Users from "../../../models/user";

class likeService {
  static clickLike = async ({ user_id, club_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    if (!club) {
      const errorMessage = "해당 클럽이 존재하지 않습니다";
      return { errorMessage };
    } else {
      const liked = await Likes.create({
        user_id,
        club_id,
      });
      return liked;
    }
  };

  static unlike = async ({ user_id, club_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    if (!club) {
      const errorMessage = "해당 클럽이 존재하지 않습니다";
      return { errorMessage };
    } else {
      const unliked = await Likes.destroy({
        where: { user_id, club_id },
      });
      return unliked;
    }
  };

  static getUserLikeClub = async ({ user_id }) => {
    const user = await Users.findOne({ where: { id: user_id } });
    if (!user) {
      const errorMessage = "해당 사용자를 찾을 수 없습니다";
      return { errorMessage };
    } else {
      const likeClubList = await db.sequelize.query(
        `SELECT * FROM likes As l LEFT JOIN clubs AS c ON l.club_id = c.id WHERE l.user_id =${user_id}`,
        { type: db.sequelize.QueryTypes.SELECT }
      );
      console.log(likeClubList);
      return likeClubList;
    }
  };
}

export { likeService };
