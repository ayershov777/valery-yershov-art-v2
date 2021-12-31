const mongoose = require("mongoose");

const databaseUri = process.env.DATABASE_URI;

const db = mongoose.connection;

db.on("connected", () => {
    console.log(`ValeryYershovArt server connected to MongoDB @${db.host}`);
});

module.exports = mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
