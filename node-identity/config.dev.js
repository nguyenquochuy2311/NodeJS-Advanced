
const fs = require('fs');
function AppSettings() {

    const PRIV_KEY = fs.readFileSync(__dirname + '/private-key.pem', 'utf8');
    const PUB_KEY = fs.readFileSync(__dirname + '/public-key.pem', 'utf8');

    this.secretKey = PRIV_KEY;
    this.publicKey = PUB_KEY;

    this.mongoTenants = 'mongodb://localhost:27017/Tenants';
    // this.mongoTenants = 'mongodb+srv://huymongo:huymongo@cluster0.nxy0r0x.mongodb.net/Tenents?retryWrites=true&w=majority';
    this.redisHost = "redis://127.0.0.1:6379";
    this.redisPass = null,
    this.mongoDb = (dbName) => {
        // return `mongodb://localhost:27017/${dbName}`;
        return `mongodb+srv://huymongo:huymongo@cluster0.nxy0r0x.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    }
};

module.exports = AppSettings;
