# Anime Ranker V2 (Node Edition)

> The first version used raw HTML and JS executing on the browser. This had a lot of limitations in the things it could do, specially on backend stuff; like file managment and saving/manipulating information. This new version has a back-end and should be better suited for this project.

## Objectives
- Learn about the server-client model. HTTP methods
- Try to build everything with standard node.
- Have fun :)

## Dependencies
- SQLite: I was going to build my own data manager, but not worth it (maybe in a future version I'll add the module).

## How to execute project
> ### **Software requirements (the ones I have):** <br>
> - **VSCodium**: Code editor with native support for node debugging.
> - **Node.js**: Download and install latest version (currently 22.7.0) (includes NPM)
> - **SQLite Studio**: A light-weight SQLite manager to create database structure, and manage and test data.

Initialize the project: ```npm install``` in project directory. <br>
Then ```node start```, accesible at http://localhost:1998. You can change it in [here].

To create the database:
1. Create a DB file ```sqlite/nyan.db```. You can put it wherever you like as long as you change the [database js](bin/nyanDataBase.js).
2. Open SQLite Studio and execute [Schema.sql](sqlite/schema.sql).
