const { FileSystemManager } = require("./file_system_manager");

const DB_FILE = "db.json";
const DEFAULT_DATA = "default.json";

const fs = new FileSystemManager();

class DbManager {
    constructor() {
        fs.checkFile(DB_FILE).catch(this.populateFile());
        fs.readFile(DEFAULT_DATA)
        .then((defaultData) => JSON.parse(defaultData))
        .then((defaultData) => {
            fs.readFile(DB_FILE)
            .then((data) => JSON.parse(data))
            .then((data) => {
                data.upgrades = defaultData.upgrades;
                return data;
            })
            .then((data) => {
                fs.writeToJsonFile(DB_FILE, JSON.stringify(data))
            });
        });
    };
    
    createPlayer = async function(id){
        await fs.readFile(DB_FILE)
        .then((data) => JSON.parse(data))
        .then((data) => {
            if (data.players.filter(player => player.id == id).length == 0){
                data.players.push({id : id, triangles : 0, rectangles : 0});
                fs.writeToJsonFile(DB_FILE, JSON.stringify(data));
            }
        });
    };

    populateFile = async function(){
        fs.readFile(DEFAULT_DATA)
            .then((defaultData) => fs.writeToJsonFile(DB_FILE, defaultData));
    };
    
    add = async function(id, body){
        fs.readFile(DB_FILE)
        .then((data) => JSON.parse(data))
        .then((data) => {
            data.players.find(player => player.id == id)[body.type] += 1;
            return data;
        })
        .then((data) => fs.writeToJsonFile(DB_FILE, JSON.stringify(data)));
    }
    
    get = async function(id, path){
        console.log((await fs.readFile(DB_FILE).then((data) => JSON.parse(data))).players.find(player => player.id == id)[path]);
        return (await fs.readFile(DB_FILE).then((data) => JSON.parse(data))).players.find(player => player.id == id)[path];
    }
};

module.exports = { DbManager };