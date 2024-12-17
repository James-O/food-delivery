const mongoose = require('mongoose')

const userOneSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });

const userOneModel = mongoose.model('userOne', userOneSchema);


module.exports = userOneModel;
