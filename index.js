const express = require("express");
const path = require("path");
const { FileSystemManager } = require("./file_system_manager");

const PORT = 5000;
const app = express();
const PUBLIC_PATH = path.join(__dirname + "/client/");
const fileSystemManager = new FileSystemManager();

app.use((request, response, next) => {
    console.log(`New HTTP request: ${request.method} ${request.url}`);
    next();
});

app.post("/add", async (request, response) => {
    //dbService.db.collection("crozuquies shapes").updateOne({}, {$inc: {triangle: 1}});
    console.log(request.body);
    response.send();
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
    //dbService.connectToServer();
});
