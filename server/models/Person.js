const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    Email: String,
    name: String,
    Phone: Number
});

const Person = mongoose.model('Person' , personSchema);


module.exports = Person;