module.exports = {
    async seed(knex) {
        await knex('user').insert([{
            username: 'admin',
            password: '$2b$10$DnaYezPbnA.i5eUsobGiOOQbIx/YEB8k8S6bTaoh3uEO1lasz.r86',
            roleId: 0
        }, {
            username: 'jão',
            password: '$2b$10$DnaYezPbnA.i5eUsobGiOOQbIx/YEB8k8S6bTaoh3uEO1lasz.r86',
            roleId: 0
        }]);
    }
}