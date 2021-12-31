const mongoose = require("mongoose");
const Collection = require("../models/collection");
const Work = require("../models/work");

async function getCollections(req, res) {
    try {
        const collections = await Collection
            .find()
            .populate("works", "-collections");

        res.json({ collections });
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

async function getCollection(req, res) {
    try {
        const collectionId = req.params["collection_id"];
        const collection = await Collection
            .findById(collectionId)
            .populate("works");

        res.json({ collection });
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

async function addCollection(req, res) {
    try {
        const collection = req.body.collection;
        await Collection.create(collection);

        res.send("ok");
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

async function updateCollection(req, res) {
    try {
        const collectionId = req.params["collection_id"];
        const collection = req.body.collection;
        const oldCollection = await Collection
            .findByIdAndUpdate(collectionId, collection)
            .populate("works");

        res.json({ oldCollection });
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

async function deleteCollection(req, res) {
    try {
        const collectionId = req.params["collection_id"];
        const oldCollection = await Collection.findByIdAndDelete(collectionId);
        // todo: delete collection reference from works in collection
        res.json({ oldCollection }); 
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

async function addWorkToCollection(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const collectionId = req.params["collection_id"];
        const workProps = req.body.work;

        if (workProps) {
            workProps.collections = [collectionId];
        }

        const options = { session };

        const workId = req.body.workId || await Work.create([workProps], options);

        if (await Collection.findOne({ works: workId })) {
            res.status(400).json({ err: "Error: work already exists in collection", workId });
            return await session.abortTransaction();
        }

        const workQuery = req.body.workId && Work.findByIdAndUpdate(
            workId,
            { $addToSet: { collections: collectionId }},
            options,
        );

        const collectionQuery = Collection.findByIdAndUpdate(
            collectionId,
            { $addToSet: { works: workId }},
            options,
        );

        await Promise.all([workQuery, collectionQuery]);

        session.commitTransaction()
            .then(() => res.send("ok"))
            .catch((err) => res.json({ err: err.message }));
    }
    catch(err) {
        session.abortTransaction()
            .then(res.json({ err: err.message }))
            .catch((abortError) => res.json({ err: { errors: [err.message, abortError.message] }}));
    }
    finally {
        session.endSession();
    }
}

async function removeWorkFromCollection(req, res) {
    try {
        res.send("not yet implemented");
    }
    catch(err) {
        res.json({ err: err.message });
    }
}

module.exports = {
    getCollections,
    getCollection,
    addCollection,
    updateCollection,
    deleteCollection,
    addWorkToCollection,
    removeWorkFromCollection,
};
