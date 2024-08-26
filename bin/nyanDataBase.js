const sql = require('sqlite3').verbose();

const NYAN_DB = "./sqlite/nyan.db";
let INIT =  false;



async function nyanInitalize(){
	
}

function nyan_Active(){
	return INIT;
}





exports.nyActive = nyan_Active;
exports.nyanInitalize = nyanInitalize;



