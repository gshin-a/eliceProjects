import Clubs from "../../../models/club";
import Applicants from "../../../models/applicant";
import Users from "../../../models/user";
import db from "../../../models/index";

class applicantService {
  static application = async ({ user_id, club_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    if (!club) {
      const errorMessage = "해당 클럽이 존재하지 않습니다";
      return { errorMessage };
    } else {
      const applicated = await Applicants.create({
        user_id,
        club_id,
      });
      return applicated;
    }
  };

  static cancelApplication = async ({ user_id, club_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    if (!club) {
      const errorMessage = "해당 클럽이 존재하지 않습니다";
      return { errorMessage };
    } else {
      const canceled = await Applicants.destroy({
        where: { user_id, club_id },
      });
      return canceled;
    }
  };

  static getApplyingClubs = async ({ user_id }) => {
    const user = await Users.findOne({ where: { id: user_id } });
    if (!user) {
      const errorMessage = "해당 사용자를 찾을 수 없습니다";
      return { errorMessage };
    } else {
      const applyingClubList = await db.sequelize.query(
        "SELECT * FROM applicants AS a LEFT JOIN clubs AS c ON a.club_id = c.id WHERE a.user_id=:id AND a.status=0",
        { replacements: { id: user_id }, type: db.sequelize.QueryTypes.SELECT }
      );
      console.log(applyingClubList);
      return applyingClubList;
    }
  };

  static getApplicants = async ({ club_id }) => {
    const club = await Clubs.findOne({ where: { id: club_id } });
    if (!club) {
      const errorMessage = "해당 클럽이 존재하지 않습니다";
      return { errorMessage };
    } else {
      const applicants = await db.sequelize.query(
        "SELECT u.id, u.nickname, a.status FROM applicants AS a LEFT JOIN users AS u ON a.user_id = u.id WHERE a.club_id = :id",
        { replacements: { id: club_id }, type: db.sequelize.QueryTypes.SELECT }
      );
      console.log(applicants);
      return applicants;
    }
  };

  static acceptance = async ({ user_id, club_id }) => {
    const applicant = await Applicants.findOne({ where: { user_id, club_id } });
    // const acceptedUser = await Applicants.findAll({ where: {club_id: club_id, status: 1} });
    const club = await Clubs.findOne({ where: club_id });

    if (!applicant) {
      const errorMessage = "해당 신청자가 존재하지 않습니다";
      return { errorMessage };
    }
    if (!club) {
      const errorMessage = "존재하지 않는 모임입니다.";
      return { errorMessage };
    }
    // if (acceptedUser.length === club.haed_count) {
    //   const errorMessage = "모집인원을 초과하였습니다";
    //   return { errorMessage };
    // }
    else {
      const accepted = await applicant.update({ status: 1 });
      return accepted;
    }
  };

  static cancelAcceptance = async ({ user_id, club_id }) => {
    const applicant = await Applicants.findOne({ where: { user_id, club_id } });
    const club = await Clubs.findOne({ where: club_id });
    if (!applicant) {
      const errorMessage = "해당 신청자가 존재하지 않습니다.";
      return { errorMessage };
    }
    if (!club) {
      const errorMessage = "존재하지 않는 모임입니다.";
      return { errorMessage };
    } else {
      const canceled = await applicant.update({ status: 0 });
      return canceled;
    }
  };

  static getMyclubList = async ({ user_id }) => {
    const applyingClubList = await db.sequelize.query(
      "SELECT * FROM applicants AS a LEFT JOIN clubs AS c ON a.club_id = c.id WHERE a.user_id=:id AND a.status=1",
      { replacements: { id: user_id }, type: db.sequelize.QueryTypes.SELECT }
    );
    return applyingClubList;
  };
}

export { applicantService };
