'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Session, { foreignKey: 'session_id' });
    }
  }
  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      session_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      difficulty: {
        type: DataTypes.ENUM('SOFT', 'MEDIUM', 'HARD'),
        defaultValue: 'SOFT'
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DNF'),
        defaultValue: 'PENDING'
      },
      focus_minutes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true
    }
  );
  return Task;
};
