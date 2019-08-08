module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define('Subscriber', {
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    subscribedChannel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subscribeDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
  }, {});
  Subscriber.associate = (models) => {
    // associations can be defined here
  };
  return Subscriber;
};
