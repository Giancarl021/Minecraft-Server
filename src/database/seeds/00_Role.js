module.exports = {
    async seed(knex) {
        await knex('role').insert([{
                id: 0,
                name: 'Administrator'
                /*
                 * CAN:
                 * - Start/Stop/Restart Server
                 * - Execute commands on terminal
                 * - Change server properties
                 * - Manage users  
                 */
            },
            {
                id: 1,
                name: 'Collaborator'
                /*
                 * CAN:
                 * - Start/Stop/Restart Server
                 * - Execute commands on terminal
                 * - Change server properties
                 */
            },
            {
                id: 2,
                name: 'Operator'
                /*
                 * CAN:
                 * - Start/Stop/Restart Server
                 * - Execute commands on terminal
                 */
            },
            {
                id: 3,
                name: 'Moderator',
                /*
                 * CAN:
                 * - Execute commands on terminal
                 */
            }
        ]);
    }
}