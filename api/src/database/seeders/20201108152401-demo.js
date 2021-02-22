'use strict';

const genAddress = require('./fixtures/address_fixtures');
const genClient = require('./fixtures/client_fixtures');
const genOrder = require('./fixtures/order_fixtures');
const genSeller = require('./fixtures/seller_fixtures');
const genProduct = require('./fixtures/product_fixtures');
const genProductCategory = require('./fixtures/productcategory_fixtures');
const genProductOrder = require('./fixtures/productorder_fixtures')
const db = require('../models/index');
const Client = require('../models/client');
module.exports = {
  up: async (queryInterface, Sequelize) => {
      try {
        const cats = ['fruits', 'legumes', 'viande', 'fromage', 'poisson'];
        let cats_id = []
        for (let ci = 0; ci < cats.length; ci++){
          let categ = await genProductCategory(queryInterface, cats[ci]);
          cats_id.push(categ[0]['id']);
        }
        for (let j = 0; j < 700; j++) {
          let cli = await genClient(queryInterface);
          for(let k = 0; k < Math.floor(Math.random(3)); k++) {
            genAddress(queryInterface, Sequelize, cli[0]['id'], 'client');
        }
        let users = await db.Client.findAll();
        let uid = users.map(function(usr) {
          return usr['dataValues']['id'];
      });
    
      for(let i=0; i<30; i++) {
      let pcer= await genSeller(queryInterface);
      genAddress(queryInterface, Sequelize, pcer[0]['id'], 'seller');
        for(let i = 0; i < 100 + Math.random() * 200; i++) {
            let product =  await genProduct(queryInterface, pcer[0]['id'], cats_id[Math.floor(Math.random() * cats_id.length)]);
            for (let k = 0; k <  Math.floor(Math.random() * 5); j++) {
                let order = await genOrder(queryInterface, uid[Math.floor(Math.random() * uid.length)]);
                let _ =  Math.random() < 0.25 ? genProductOrder(queryInterface, order[0]['id'], product[0]['id']): null;
            }
        }
      }
      }
      }catch(e) {
        console.log(e);
      }
  }
  ,

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
