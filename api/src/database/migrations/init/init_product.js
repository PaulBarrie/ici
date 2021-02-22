

const initProduct = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      expiration: {
        type: Sequelize.DATEONLY
      },
      tax_rate: Sequelize.FLOAT,
      price_ht: Sequelize.FLOAT,
      q_available: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.TEXT
      },
      measure_unit: {
        type: Sequelize.ENUM,
        values: ['g', 'L', 'unit']
      },
      picture: {
        type: Sequelize.STRING
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        references: {
          model: 'Seller',
          key: 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ProductCategory',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
}

module.exports = initProduct;