import Sequelize from "sequelize";

module.exports = class Club extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 클럽 id
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        // 클럽 name
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        // 클럽장 id
        manager: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        // 클럽 썸네일
        picture: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        // 클럽 한줄 소개
        intro: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        // 클럽 진행 기간
        duration: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        // 클럽 모집 상태
        state: {
          type: Sequelize.TINYINT,
          // 0: 모집중 , 1: 모집마감
          allowNull: false,
          defaultValue: 0,
        },
        // 클럽 진행(온라인/ 오프라인)
        online: {
          type: Sequelize.TINYINT,
          allowNull: true,
          defaultValue: 0,
        },
        offline: {
          type: Sequelize.TINYINT,
          allowNull: true,
          defaultValue: 0,
        },
        // 클럽 상세 설명
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        // 클럽 조회수
        views: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        // 클럽 인원수
        head_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        // 클럽 진행 방식(주중/주말)
        weekday: {
          type: Sequelize.TINYINT,
          allowNull: true,
          defaultValue: 0,
        },
        weekend: {
          type: Sequelize.TINYINT,
          allowNull: true,
          defaultValue: 0,
        },
        hashtag1: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        hashtag2: {
          type: Sequelize.STRING(100),
          allowNull: true,
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
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("Now"),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Clubs",
        tableName: "clubs",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
        // freezeTableName: true,
      }
    );
  }
};
