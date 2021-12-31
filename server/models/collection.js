const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    works: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "work",
        }],
    }
});

// collectionSchema.pre("find", (next) => {
//     this.populate("work");
//     // next();
// })

module.exports = mongoose.model("collection", collectionSchema);
