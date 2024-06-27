
//Mongoose provides a way to model and interact with MongoDB data in a more structured manner.
const mongoose = require('mongoose');
//A schema in Mongoose defines the structure of the document, specifying the fields and their data types.
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);
