module.exports = {
  up: async (queryInterface) => {
    
    await queryInterface.sequelize.query(`
    INSERT INTO "Versions"
    (id, "versionFrontend", "versionBackend", "createdAt", "updatedAt")
    VALUES(1, '2.0.2a', '2.0.2a', '2025-00-09 12:13:48.163', '2025-00-09 13:02:46.030')`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DELETE FROM "Versions"');
  }
};
