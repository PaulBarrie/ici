'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Session.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    uid: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.ENUM({
            values: ['CLIENT', 'SELLER']
          })
    },
    token: {
        type: DataTypes.STRING
    },
    remember: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'Session',
    freezeTableName: true
  });
  return Session;
};