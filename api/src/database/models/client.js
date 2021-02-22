'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Client.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    picture: {
      type:DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'Client',
    freezeTableName: true
  });
  return Client;
};