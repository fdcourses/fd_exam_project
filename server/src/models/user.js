'use strict';
const { Model } = require('sequelize');
const { ROLES } = require('../constants');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePasswords(password) {
      return bcrypt.compare(password, this.password);
    }

    static associate({ Offer, Contest, Rating }) {
      User.hasMany(Offer, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(Contest, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(Rating, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'passwordHash',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(ROLES)),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
