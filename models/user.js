const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{type:Number,required:true},
    first_name: { type: String},
    last_name:{ type: String},
    birthday: { type: Date},
    marital_status: { type: String, enum: ['single', 'married', 'divorced', 'widowed']},
    total: { type: Number}
})



const User = mongoose.model('User', userSchema);

module.exports = User;