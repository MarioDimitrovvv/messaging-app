const config = {
    development: {
        PORT: 4000,
        // DB_CONNECTION: 'mongodb://localhost/messaging-app',
        DB_CONNECTION: 'mongodb+srv://mario123:asdasd@messagingapp.fdilo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        SALT_ROUNDS: 5,
        SECRET: 'verysecret',
        COOKIE: 'USER_SESSION',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'insert mongo atlas database',
        SALT_ROUNDS: 15,
        SECRET: 'verysecret',
        COOKIE: 'USER_SESSION',
    }
};

module.exports = config[process.env.NODE_ENV.trim()];