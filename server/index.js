const createServer = require("./server");

require("dotenv").config();

const dbConnectionPromise = require("./config/database");

// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'tmp');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const name = file.fieldname + '-' + uniqueSuffix;
//         req.body.image = file;
//         cb(null, name);
//     }
// });

// const upload = multer({ storage });

const port = process.env.PORT || 3000;

async function start() {
    try {
        const app = createServer();
        await dbConnectionPromise;
        app.listen(port, () => {
            console.log(`ValeryYershovArt server listening from port ${port}`);
        });    
    }
    catch(err) {
        json.status(502).send("Error: unable to connect to database");
    }
}

start();
