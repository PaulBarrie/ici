'use strict';

const {Sequelize} = require('sequelize');

const initAddress = require('./init/init_address')
const initClient = require('./init/init_client')
const initOrder = require('./init/init_order')
const initSeller = require('./init/init_seller')
const initSession = require('./init/init_session')
const initProduct = require('./init/init_product')
const initProductCategory = require('./init/init_product-category')
const initProductOrder = require('./init/init_product-order')



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await initClient(queryInterface, Sequelize);
    await initSeller(queryInterface, Sequelize);
    await initSession(queryInterface, Sequelize);
    await initProductCategory(queryInterface, Sequelize);
    await initProduct(queryInterface, Sequelize);
    await initAddress(queryInterface, Sequelize);
    await initOrder(queryInterface, Sequelize);
    await initProductOrder(queryInterface, Sequelize);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ProductOrder');
    await queryInterface.dropTable('Order');
    await queryInterface.dropTable('Product');
    await queryInterface.dropTable('ProductCategory');
    await queryInterface.dropTable('Address');
    await queryInterface.dropTable('Session');
    await queryInterface.dropTable('Client');
    await queryInterface.dropTable('Seller');
  }
};
