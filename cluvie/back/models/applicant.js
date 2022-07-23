import Sequelize from "sequelize";

module.exports = class Applicants extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        club_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        status: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: "0",
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("Now"),
        },
        is_deleted: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: "0",
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Applicants",
        tableName: "applicants",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
