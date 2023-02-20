module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('plans', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      title: Sequelize.STRING,
      best: Sequelize.BOOLEAN,
      price: Sequelize.FLOAT,
      text_items: {
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
    return queryInterface.dropTable('plans');
  },
};
