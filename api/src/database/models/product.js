'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.categoryId = this.belongsTo(models.ProductCategory, { as: 'category', foreignKey: 'categoryId' });
    }
  };
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    expiration: DataTypes.DATEONLY,
    q_available: DataTypes.FLOAT,
    measure_unit: {
      type: DataTypes.ENUM,
      values: ['g', 'L', 'unit']
    },
    description: DataTypes.TEXT,
    tax_rate: DataTypes.FLOAT,
    price_ht: DataTypes.FLOAT,
    picture: DataTypes.STRING,
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
      references: {
        model: 'Seller',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProductCategory',
        key: 'id'
      }
    },
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'Product',
    freezeTableName: true
  });
  return Product;
};