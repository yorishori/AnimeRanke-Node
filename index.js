import express from 'express';
import { readFile } from 'node:fs/promises';

const app = express();
const port = 1998;

app.get('/', async (req, res)=>{
	res.send(await readFile('./html/uploadPage.html','utf-8'));
});


app.listen(port, ()=>{
	console.log(`Listening on: http://localhost:${port}/`);
});