module.exports = {
    async up(knex) {
        return knex.schema.createTable('role', table => {
            table.increments('id').primary();
            table.string('name').unique().notNullable();
        });
    },

    async down(knex) {
        return knex.schema.dropTable('user');
    }
}