module.exports = {
    async up(knex) {
        return knex.schema.createTable('ignored', table => {
            table.string('id').primary();
            table.integer('index').notNullable();
        });
    },

    async down(knex) {
        return knex.schema.dropTable('ignored');
    }
}