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
			routeGet(req.url, nyanResponse);break;
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
function routeGet(url, nyanResponse){
	if(url === "/"){
		getFile("static/html/index.html", 'text/html', nyanResponse);
	}
	
	if(url === "/style.css"){
		getFile("static/css/style.css", 'text/css', nyanResponse);
	}

	if(url === "/jquery-3.7.1.slim.min.js"){
		getFile("lib/jquery-3.7.1.slim.min.js", 'text/javascript', nyanResponse);
	}

	if(url === "/index.js"){
		getFile("static/js/index.js", 'text/javascript', nyanResponse);
	}

	if(!nyanResponse){
		nyanResponse.head.status = 404;
		nyanResponse.val = "Content not found. Unidentified URL in request.";
	}
}


function getFile(file, type, nyanResponse){
	try{
		nyanResponse.head.status = 200;
		nyanResponse.head.opts = {'Content-Type':type};
		nyanResponse.val = fs.readFileSync(file);
	}catch(err){
		nyanResponse.head.status = 404;
		nyanResponse.val = `"${file}" Not Found :( `;
		console.log(err);
	}
}

exports.nyanReq = nyanReq;
