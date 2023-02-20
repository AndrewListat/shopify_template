module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("shops", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shopify_domain: Sequelize.STRING,
      shop_id: Sequelize.STRING,
      domain: Sequelize.STRING,
      access_token: Sequelize.STRING,
      pricing_plan: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      charge_id: Sequelize.STRING,
      charge_data: Sequelize.JSON,
      start_plan_date: Sequelize.DATE,
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable("shops");
  },
};
