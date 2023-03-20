const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const connect = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.lhytih9.mongodb.net/?retryWrites=true&w=majority`);
        return dbConn;
    } catch (error) {
        console.log(error);
    }
}

connect();

module.exports = connect;