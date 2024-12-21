const { DataTypes } = require('sequelize')

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('Todos', 'done', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        })
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('Todos', 'done')
    }
}