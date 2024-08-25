const sql = require('sqlite3').verbose();

let DB_INITIALIZED = false;


function nyan_Active(){
    DB_INITIALIZED = !DB_INITIALIZED;
    return DB_INITIALIZED;
}





exports.nyActive = nyan_Active;



