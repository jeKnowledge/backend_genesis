'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User',
      {
        name: { type: Sequelize.STRING, allowNull: false },
        username: { type: Sequelize.STRING, allowNull: false },
        email: {
          type: Sequelize.STRING, allowNull: false,
          validate: { isEmail: true }
        },
        password: {
          type: Sequelize.STRING, allowNull: false,
          validate: { min: 8 }
        },
        permissions: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User')
  }
}