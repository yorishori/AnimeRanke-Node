const https = require('node:http');
const fs = require('node:fs');

/**
 * 
 * @param {https.IncomingMessage} req http request
 * @returns json variable
 *      nyanResponse
 *          |-head
 *          |   |-status
 *          |   --opts (optional)
 *          --val
 */
function nyanReq(req){
	let nyanResponse= {
		head: {
			status: undefined,
			opts: undefined
		},
		val: undefined
	};

	switch(req.method){
		case "GET":
			nyanResponse = routeGet(req.url);break;
		case "POST":
			//nyanResponse = routePost(req);break;
		default:
			nyanResponse.head.status = 501;
			nyanResponse.val = `HTTP Method "${req.method}" not implemeted`
			break;
	}

	return nyanResponse;
}

/**
 * 
 * @param {string} url request url
 * @returns json variable
 *      nyanResponse
 *          |-head
 *          |   |-status
 *          |   --opts (optional)
 *          --val
 */
function routeGet(url){
	let nyanResponse = {
		head: {
			status: undefined,
			opts: undefined
		},
		val: undefined
	};

	if(url === "/"){
		try{
			nyanResponse.head.status = 200;
			nyanResponse.head.opts = {'Content-Type':'text/html'};
			nyanResponse.val = fs.readFileSync("static/html/index.html");
		}catch(err){
			nyanResponse.head.status = 404;
			nyanResponse.val = "Index Not Found :( ";
			console.log(err);
		}
	}
	
	if(url === "/getNumber"){
		nyanResponse.head.status = 200;
		nyanResponse.head.opts = {'Content-Type':'application/json'};
		nyanResponse.val = `{"value":"${Math.random().toString()}"}`;
	}
	
	if(url === "/jquery-3.7.1.slim.min.js"){
		try{
			nyanResponse.head.status = 200;
			nyanResponse.head.opts = {'Content-Type':'text/js'};
			nyanResponse.val = fs.readFileSync("lib/jquery-3.7.1.slim.min.js");
		}catch(err){
			nyanResponse.head.status = 404;
			nyanResponse.val = "JQuery Library Not Found :( ";
			console.log(err);
		}
	}

	if(!nyanResponse){
		nyanResponse.head.status = 404;
		nyanResponse.val = "Content not found. Unidentified URL in request.";
	}
	
	return nyanResponse;
}

exports.nyanReq = nyanReq;
