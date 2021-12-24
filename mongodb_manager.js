const { MongoClient } = require("mongodb");

const DB_USERNAME = 'crozuquies';
const DB_PASSWORD = '8012';
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.tzgm1.mongodb.net/crozuquies?retryWrites=true&w=majority`;
const DB_DB = 'crozuquies';

class DatabaseService {
    async connectToServer(uri = DB_URL) {
        try {
            this.client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await this.client.connect();
            this.db = this.client.db(DB_DB);
            console.log('Successfully connected to MongoDB.');
        } catch (err) {
            console.error(err);
        }
    }
}
  
const dbService = new DatabaseService();
  
module.exports = { dbService };