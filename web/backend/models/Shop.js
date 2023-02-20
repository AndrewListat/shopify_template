export default function (sequelize, DataTypes) {
  const Shop = sequelize.define(
    'Shop',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shopify_domain: DataTypes.STRING,
      access_token: DataTypes.STRING,
      shop_id: DataTypes.STRING,
      domain: DataTypes.STRING,
      pricing_plan: {
        type: DataTypes.STRING,
        defaultValue: 'Free',
      },
      charge_id: DataTypes.STRING,
      start_plan_date: DataTypes.DATE,
    },
    {
      tableName: 'shops',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Shop;
};
