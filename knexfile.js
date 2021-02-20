// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : 'ec2-54-90-13-87.compute-1.amazonaws.com',
      user     : 'soyxgwjoklmjkk',
      password : 'bbfe379c54b7d60be03ab41ba25d9504f92ef3cff8e236aa742a89832cc7c8a7',
      database : 'd7j21jtk6u4838',
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host     : 'ec2-54-90-13-87.compute-1.amazonaws.com',
      user     : 'soyxgwjoklmjkk',
      password : 'bbfe379c54b7d60be03ab41ba25d9504f92ef3cff8e236aa742a89832cc7c8a7',
      database : 'd7j21jtk6u4838',
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host     : 'ec2-54-90-13-87.compute-1.amazonaws.com',
      user     : 'soyxgwjoklmjkk',
      password : 'bbfe379c54b7d60be03ab41ba25d9504f92ef3cff8e236aa742a89832cc7c8a7',
      database : 'd7j21jtk6u4838',
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }

};
