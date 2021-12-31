const mongoose = require("mongoose")
const createServer = require("./server");

beforeEach((done) => {
    const databaseUri = process.env.DATABASE_URI;
    mongoose.connect(databaseUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	});
});

const app = createServer();

const Work = require("../models/work");

// test("GET /works", async () => {
//     const 
// });