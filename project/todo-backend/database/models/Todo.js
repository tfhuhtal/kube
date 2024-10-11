import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../connection.js'

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Todo",
    tableName: "Todos",
  }
)

export default Todo
