'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.clientId = this.belongsTo(models.Client, {as: 'client', foreignKey:'clientId'})
    }
  };
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    time_order: DataTypes.DATE,
    sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    time_sent: DataTypes.DATE,
    received: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    time_rec: DataTypes.DATE,
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'Client',
        key: 'id'
      }
    },
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
  },
  {
    sequelize,
    modelName: 'Order',
    freezeTableName: true
  });
  return Order;
};