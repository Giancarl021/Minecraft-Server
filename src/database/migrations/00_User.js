module.exports = {
    async up(knex) {
        return knex.schema.createTable('user', table => {
            table.string('username').primary();
            table.string('password').notNullable();
        }).then(() => {
            return knex('user').insert({
                username: 'giancarl021',
                password: '$2b$10$DnaYezPbnA.i5eUsobGiOOQbIx/YEB8k8S6bTaoh3uEO1lasz.r86'
            });
        });
    },

    async down(knex) {
        return knex.schema.dropTable('user');
    }
}