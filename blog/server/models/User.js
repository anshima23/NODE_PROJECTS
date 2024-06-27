
//Mongoose provides a way to model and interact with MongoDB data in a more structured manner.
const mongoose = require('mongoose');
//A schema in Mongoose defines the structure of the document, specifying the fields and their data types.
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    }
    
});

module.exports = mongoose.model('User', UserSchema);
