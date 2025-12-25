'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      race_weekend_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'race_weekends',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('FP1', 'FP2', 'FP3', 'QUALI', 'RACE'),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 1
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
    await queryInterface.dropTable('sessions');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_sessions_type";');
  }
};
