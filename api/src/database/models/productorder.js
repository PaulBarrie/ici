'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.productId = this.belongsTo(models.Product, { as: 'product', foreignKey: 'productId'})
      this.orderId = this.belongsTo(models.Order, { as: 'order', foreignKey: 'orderId'});
    }
  };
  ProductOrder.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT,
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'Order',
        key: 'id'
      }
    },
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'ProductOrder',
    freezeTableName: true
  });
  return ProductOrder;
};