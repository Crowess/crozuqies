const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { FileSystemManager } = require("./file_system_manager");
const { DbManager } = require("./db_manager");
const cookieParser = require("cookie-parser");

const PORT = 5000;
const app = express();
const PUBLIC_PATH = path.join(__dirname + "/client/");
const fileSystemManager = new FileSystemManager();
const dbManager = new DbManager();

app.use((request, response, next) => {
    console.log(`New HTTP request: ${request.method} ${request.url}`);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/add", async (request, response) => {
    await dbManager.createPlayer(request.cookies.id);
    await dbManager.add(request.cookies.id, request.body);
    response.send();
});

app.get("/triangles", async (request, response) =>{
    await dbManager.createPlayer(request.cookies.id);
    response.status(200).send(JSON.stringify({amt : await dbManager.get(request.cookies.id, "triangles")}));
});

app.get("/rectangles", async (request, response) =>{
    await dbManager.createPlayer(request.cookies.id);
    response.status(200).send(JSON.stringify({amt : await dbManager.get(request.cookies.id, "rectangles")}));
});

app.get("/*", async (request, response) => {
    let currentRoute = request.path;
    currentRoute = (currentRoute === "" ? "index.html" : currentRoute);
    try{
      await fileSystemManager.checkFile(PUBLIC_PATH + currentRoute);
      response.sendFile(PUBLIC_PATH + currentRoute);
    }
    catch{
      response.statusCode = 404;
      response.sendFile(PUBLIC_PATH + "error.html");
    }
});

const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
