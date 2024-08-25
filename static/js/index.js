
async function getJson(path, callback){
	fetch(path, {
		method:"GET"
	}).then((res) => {
		if(!res.ok)
			throw new Error("Couldn't fetch request!");
		return res.json();
	}).then((data) => {
		callback(data);
	}).catch((error) => {
		alert(error);
	});
}


function loadRanker(){
	getJson("/saves/headers", (data)=>{
		return;
	});
}


function newRanker(){
	
}