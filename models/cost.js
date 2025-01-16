const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costSchema = new Schema({
    description: { type: String, required: true },
    category: { type: String, required: true , enum: ['Sport', 'Food', 'Housing', 'Education', 'Health']},
    userid: { type: Number, ref: 'User', required: true },
    sum: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cost', costSchema);