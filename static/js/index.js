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


function openModal(ID){
	let modal = $(ID)[0];

	if(modal){
		modal.style.display = 'block';
		window.onclick = (evnt) => {
			if(evnt.target==modal){
				closeModal(ID);
				window.onclick = null;
			}
		}
	}
}

function closeModal(ID){
	let modal = $(ID)[0];
	if(modal)
		modal.style.display = 'none';
}