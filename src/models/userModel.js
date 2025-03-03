const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    tasks: { type: [{
        title: { type: String, required: true},
        completed: { type: Boolean, default: false}
    }]}
})

const User = mongoose.model('User', UserSchema);


module.exports = User;