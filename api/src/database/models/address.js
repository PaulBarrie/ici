'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.sellerId = this.belongsTo(models.Seller, { as: 'Seller', foreignKey: 'sellerId' });
        this.clientId = this.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId' });
    }
  };
  Address.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    location: DataTypes.GEOMETRY('POINT'),
    street_nb: DataTypes.STRING,
    street_name: DataTypes.STRING,
    post_code: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'Client',
        key: 'id'
      }
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Seller',
        key: 'id'
      }
    },
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'Address',
    freezeTableName: true
  });
  return Address;
};