const https = require("node:http");
const fs = require("node:fs");


/*===============================
=			CONSTANTS			=
===============================*/
const files = {
	static:[
		// HTML
		{vpath:"/", path:"static/html/index.html", type:"text/html"},
		// CSS
		{vpath:"/style.css", path:"static/css/style.css", type:"text/css"},
		{vpath:"/index.js", path:"static/js/index.js", type:"text/css"},
		// JS
		{vpath:"/jquery.js", path:"lib/jquery-3.7.1.slim.min.js", type:"text/js"}

	],
	err:{
		db:{status:503, path:"static/html/err/dberr.html"},
		nyan:{status:418, path:"static/html/err/nyan.html"},
	}
}


/*===============================
=			FUNTIONS			=
===============================*/
/** Return the response depending on request
 * 
 * @param {https.IncomingMessage} req http request
 * @returns json variable {head{status,opts},val};
 *    
 */
function nyanReq(req){
	let res = {head: {status: undefined,opts: undefined},val: undefined};
	let vPath = req.url;
	
	try{
		switch(req.method){
			case "GET":
				nyanGet(res, vPath);break;
			case "POST":
				//routePost(req);break;
			default:
				res.head.status = 501;
				res.val = `HTTP Method "${req.method}" not implemeted`;
				console.log(`Client requested unimplemented method: ${req.method}`);
				break;
		}
	}catch(err){
		res.head.status = 404;
		res.val = `"Something went wrong in routing HTTP request: ${err}`;
		console.log(err);
	}finally{	
		return res;
	}
}

/** Route from content type of request
 * 
 * @param {any}	res reference to custom reponse json (updatable)
 * @param {string} vPath virtual path from request
 */
function nyanGet(res, vPath){
	for(i=0; i<files.static.length; i++){
		let e = files.static[i];
		if (e.vpath===vPath){
			getFile(res, e.path, e.type);
			return;
		}
	}

	nyanGetErr(res, files.err.nyan);
	return;
}

/** Return the requested error page
 * 
 * @param {any}	res reference to custom reponse json (updatable)
 * @param {any} errType file error object
 */
function nyanGetErr(res, errType){
	res.head.status = errType.status;
	res.head.opts = {'Content-Type':"text/html"};
	res.val = fs.readFileSync(errType.path);
	return;
}

/**
 * 
 * @param {any} res reference to custom reponse json (updatable)
 * @param {string} path physicaḷ relative path to the file
 * @param {string} type type of file
 * @returns 
 */
function getFile(res, path, type){
	res.head.status = 200;
	res.head.opts = {'Content-Type':type};
	res.val = fs.readFileSync(path);
	return;
}

// Funtions
exports.nyanReq = nyanReq;
