

const initSession =  async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Session', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.ENUM({values: ['CLIENT', 'SELLER']})
      },
      token: {
        type: Sequelize.STRING
      },
      remember: {
          type: Sequelize.BOOLEAN
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

module.exports = initSession;