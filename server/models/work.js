const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    medium: {
        type: String,
    },
    year: {
        type: Number,
    },
    collections: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "collection",
        }],
    }
});


module.exports = mongoose.model("work", workSchema);
