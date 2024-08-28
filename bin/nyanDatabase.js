const nyan_sql = require('sqlite3').verbose();

const NYAN_DB = "./sqlite/nyan.db";
let INIT =  false;



async function nyanDBIntegrety(){
	let nyanAnimes = await nyanQuery("SELECT 1 FROM nyanAnimes").catch((err) => {
		console.error(`Internal ERROR [nyanDatabase]: ${err}`);
		return null;
	});

	let nyanSaves = await nyanQuery("SELECT 1 FROM nyanSaves").catch((err) => {
		console.error(`Internal ERROR [nyanDatabase]: ${err}`);
		return null;
	});

	if(nyanAnimes && nyanSaves){
		INIT = true;
		console.log("DB verificacion successful :)");
	}else{
		INIT = false;
		console.log("DB verification unsuccessful :(");
	}
}

function nyan_Active(){
	return INIT;
}


async function nyanQuery(sql){
	return new Promise((res, rej) => {
		let db = new nyan_sql.Database(NYAN_DB, nyan_sql.OPEN_READONLY, (err) => {
			if(err)
				rej(err);
		});
		
		db.all(sql, [], (err, rows) =>{
			if(err)
				rej(err);
			
			res(rows);
		});

		db.close();
	});
}



exports.nyActive = nyan_Active;
exports.nyanTegrity = nyanDBIntegrety;



