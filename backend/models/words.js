const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    rows: {
        type: Number,
        required: true,
        default: 6
    },
    hints: [{
        hint: { type: String },
        hintType: {
            type: String,
            enum: ["Meaning", "Synonym", "Antonym"]
        }
    }]
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
});

const Word = mongoose.model('Word', WordSchema);
module.exports = Word;
