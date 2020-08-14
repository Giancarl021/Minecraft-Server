module.exports = {
    async up(knex) {
        return knex.schema.createTable('user', table => {
            table.string('username').primary();
            table.string('password').notNullable();
        });
    },

    async down(knex) {
        return knex.schema.dropTable('user');
    }
}