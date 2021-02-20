
exports.up = function(knex) {
    return knex.schema.createTable('watchlist',function(table){
        table.increments();
        table.timestamps();
        table.json('watchlist').nullable();
     });

};

exports.down = function(knex) {
  
};
