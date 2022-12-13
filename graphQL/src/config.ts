export default {
  port: process.env.PORT || 3010,
  database: {
    type: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: process.env.DATABASE_PORT || 3306,
      database: process.env.DATABASE_NAME || 'graphql',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  },
  defaultQuery: `

  `,
};
