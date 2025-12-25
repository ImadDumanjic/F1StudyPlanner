'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('race_weekends', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED'),
        defaultValue: 'PLANNED'
      },
      streak_at_that_time: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('race_weekends');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_race_weekends_status";');
  }
};
