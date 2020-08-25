module.exports = {
    async seed(knex) {
        await knex('role').insert([{
                id: 0,
                name: 'Administrator'
            },
            {
                id: 1,
                name: 'Collaborator'
            },
            {
                id: 2,
                name: 'User'
            }
        ]);
    }
}