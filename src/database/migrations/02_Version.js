module.exports = {
    async up(knex) {
        return knex.schema.createTable('version', table => {
            table.string('id').primary();
            table.string('uri').notNullable();
        });
    },

    async down(knex) {
        return knex.schema.dropTable('version');
    }
}