
const Model = require('../db/knex')

class WatchList extends Model {
    static get tableName() {
        return 'watchlist';
    }
}

module.exports = WatchList;