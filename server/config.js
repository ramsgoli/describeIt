module.exports = {
    development: true,
    db: {
        DB: process.env.POSTGRES_DB,
        USER: process.env.POSTGRES_USER,
        PASSWORD: process.env.POSTGRES_PASSWORD 
    },
    gameStates: {
        ERROR_STATE: 'ERROR_STATE',
        LOBBY_STATE: 'LOBBY_STATE',
        SUBMISSIONS_STATE: 'SUBMISSIONS_STATE',
        VOTING_STATE: 'VOTING_STATE',
        CALCULATING_STATE: 'CALCULATING_STATE',
        RESULTS_STATE: 'RESULTS_STATE',
    }
}