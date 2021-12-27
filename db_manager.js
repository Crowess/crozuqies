const { FileSystemManager } = require("./file_system_manager");

const DB_FILE = "db.json";
const DB_UPDATE_TIME = 60000;

const fs = new FileSystemManager();

class DbManager {
    constructor() {};

    populateFile = async function(){
        console.log("file was populated");
        await fs.writeToJsonFile(DB_FILE, JSON.stringify({players: []}));
    };

    init = async function(){
        await fs.checkFile(DB_FILE).catch(async () => await this.populateFile());
        this.data = await fs.readFile(DB_FILE).then(data => JSON.parse(data));
        this.updateDb();
    };

    updateDb = async function(){
        fs.writeToJsonFile(DB_FILE, JSON.stringify(this.data));
        console.log("updated");
        setTimeout(() => this.updateDb(), DB_UPDATE_TIME);
    };
    
    createPlayer = async function(id){
        if (this.data.players.find(player => player.id == id) == undefined)
            this.data.players.push({id: id});
    };
    
    add = async function(id, body){
        this.data.players.find(player => player.id == id)[body.type] += 1;
    }
    
    get = async function(id, path){
        if (!this.data.players.find(player => player.id == id)[path])
            this.data.players.find(player => player.id == id)[path] = 0;
        return this.data.players.find(player => player.id == id)[path];
    }

    getData = async function(){
        return this.data
    }

    setData = async function(data){
        this.data = data;
    }
};

module.exports = { DbManager };