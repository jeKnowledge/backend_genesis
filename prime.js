const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'fghj43ws7dyfhtj54', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
});

const Model = Sequelize.Model;
class User extends Model {}
User.init({
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissions: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    timestamps: true

}, {
    sequelize,
    modelName: 'user'
    // options
});