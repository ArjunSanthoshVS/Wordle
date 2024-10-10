const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    words: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ]
})

const User = mongoose.model('User', UserSchema)
module.exports = User;