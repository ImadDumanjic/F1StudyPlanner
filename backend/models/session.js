'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.RaceWeekend, { foreignKey: 'race_weekend_id' });
      Session.hasMany(models.Task, { foreignKey: 'session_id' });
    }
  }
  Session.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      race_weekend_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('FP1', 'FP2', 'FP3', 'QUALI', 'RACE'),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'Session',
      tableName: 'sessions',
      underscored: true
    }
  );
  return Session;
};
