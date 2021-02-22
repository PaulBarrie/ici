

const initAddress = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.GEOMETRY("POINT")
      },
      street_nb: {
        type: Sequelize.STRING
      },
      street_name: {
        type: Sequelize.STRING
      },
      post_code: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        references: {
          model: 'Client',
          key: 'id'
        }
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'Seller',
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

module.exports = initAddress;