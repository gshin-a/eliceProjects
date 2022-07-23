import Sequelize from "sequelize";

module.exports = class Ratings extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        club_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        star_sum: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        is_deleted: {
          type: Sequelize.TINYINT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Ratings",
        tableName: "ratings",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
