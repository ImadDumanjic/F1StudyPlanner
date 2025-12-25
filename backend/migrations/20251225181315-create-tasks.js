'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      session_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sessions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      difficulty: {
        type: Sequelize.ENUM('SOFT', 'MEDIUM', 'HARD'),
        defaultValue: 'SOFT'
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DNF'),
        defaultValue: 'PENDING'
      },
      focus_minutes: {
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
    await queryInterface.dropTable('tasks');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_difficulty";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_status";');
  }
};
