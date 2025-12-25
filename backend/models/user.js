'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.RaceWeekend, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true
    }
  );
  return User;
};
