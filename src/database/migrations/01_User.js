module.exports = {
    async up(knex) {
        return knex.schema.createTable('user', table => {
            table.string('username').primary();
            table.string('password').notNullable();
            table.integer('roleId', 0).unsigned().references('id').inTable('role');
        });
    },

    async down(knex) {
        return knex.schema.dropTable('user');
    }
}