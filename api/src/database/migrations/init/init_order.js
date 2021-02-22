
const initOrder =  async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      validated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      time_order: {
        type: Sequelize.DATE
      },
      sent: {
        type: Sequelize.BOOLEAN
      },
      time_sent: {
        type: Sequelize.DATE
      },
      received: {
        type: Sequelize.BOOLEAN
      },
      time_rec: {
        type: Sequelize.DATE
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: 'Client',
          key: 'id'
        },
    
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

module.exports = initOrder;