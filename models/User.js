const User = (sequelize, DataTypes) => {
  const model = sequelize.define('User',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING, allowNull: false,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING, allowNull: false,
        validate: { min: 8 }
      },
      permissions: { type: DataTypes.NUMBER, allowNull: false, defaultValue: 0 },
      timestamps: true
    },
    {
      indexes: [{ unique: true, fields: [ 'username', 'email' ] }],
      sequelize
    }
  )

  model.associate = function(models) {
    // associations can be defined here
  }

  return model
}

export default User