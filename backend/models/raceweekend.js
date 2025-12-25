'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RaceWeekend extends Model {
    static associate(models) {
      RaceWeekend.belongsTo(models.User, { foreignKey: 'user_id' });
      RaceWeekend.hasMany(models.Session, { foreignKey: 'race_weekend_id' });
    }
  }
  RaceWeekend.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      status: {
        type: DataTypes.ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED'),
        defaultValue: 'PLANNED'
      },
      streak_at_that_time: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'RaceWeekend',
      tableName: 'race_weekends',
      underscored: true
    }
  );
  return RaceWeekend;
};
