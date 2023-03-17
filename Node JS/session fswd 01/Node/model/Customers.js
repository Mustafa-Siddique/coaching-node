const { Schema, model } =  require('mongoose');

const userSchema = new Schema({
    name: String,
    phone: Number,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    userType: String
});

const User = model('User', userSchema);
exports.Customers = User;

