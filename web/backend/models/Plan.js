/* eslint-disable max-len */
export default function (sequelize, DataTypes) {
  const Plan = sequelize.define(
    'Plan',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      best: DataTypes.BOOLEAN,
      price: DataTypes.FLOAT,
      // reviews: DataTypes.INTEGER,
      text_items: DataTypes.JSON,
    },
    {
      tableName: 'plans',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Plan;
};
