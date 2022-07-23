import Sequelize from "sequelize";

module.exports = class Reviews extends Sequelize.Model {
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
        star_rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        contents: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        created_at: {
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
        modelName: "Reviews",
        tableName: "reviews",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
