/* eslint-disable max-len */
export default function (sequelize, DataTypes) {
  const Shop = sequelize.define(
    'Widget',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shopify_domain: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      click_rating: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      first_show: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      show_instruction: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      setting: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      tableName: 'widgets',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Shop;
};
