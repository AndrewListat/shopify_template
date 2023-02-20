module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('widgets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shopify_domain: Sequelize.STRING,
      active: Sequelize.BOOLEAN,
      first_show: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      show_instruction: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      click_rating: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      setting: {
        type: Sequelize.JSON,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('widgets');
  },
};
