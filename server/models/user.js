const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema =  new Schema({
  name : {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String,minlength:6}
});

const User = mongoose.model('User', userSchema);

module.exports = User;