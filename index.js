const express = require("express");
const path = require("path");
const { FileSystemManager } = require("./file_system_manager");
const {dbService} = require("./mongodb_manager");

const PORT = 5000;
const app = express();
const PUBLIC_PATH = path.join(__dirname + "/client/");
const fileSystemManager = new FileSystemManager();

app.use((request, response, next) => {
    console.log(`New HTTP request: ${request.method} ${request.url}`);
    next();
});

app.get("/add", async (request, response) => {
    dbService.db.collection("crozuquies shapes").updateOne({}, {$inc: {triangle: 1}});
    response.send();
});

app.get("/*", async (request, response) => {
    let currentRoute = request.path.split("/")[1];
    currentRoute = (currentRoute === "" ? "index" : currentRoute) + ".html";
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
    console.log(`Listening on port ${PORT}`);
    dbService.connectToServer();
});