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
        type: String
    },
    image: {
        type: String
    },
    words: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Word',
            attempts: {
                type: Number,
                default: 0
            },
            rowsUsed: Number
        }
    ],
    streak: [{
        date: Date,
        completed: Number,
        hintsUsed: {
            type: Number,
            default: 0
        }
    }]
})

const User = mongoose.model('User', UserSchema)
module.exports = User;