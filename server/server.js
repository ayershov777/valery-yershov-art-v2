const express = require("express");

function createServer() {
    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        next();
    });

    // app.use(express.urlencoded({ limit: '50mb', extended: true }));

    // app.post("/api/v1/collections/:collectionId/works",
    //     upload.single("image"),
    //     (req, res) => {
    //         console.log(req.image);
    //         console.log(req.body.title);
    //         res.send("ok");
    //     }
    // );

    app.use("/api/v1/collections", require("./routers/collections"));
    app.use("/api/v1/works", require("./routers/works"));

    return app;
}

module.exports = createServer;
