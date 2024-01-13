const mongoose = require('mongoose');

const database_url = 'mongodb+srv://Leem:(password-removed)@cluster0.3hembv8.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(database_url, { useNewUrlParser: true })

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password_hash:{
        type: String,
        required: true
    },
    api_key:{
        type: String,
        unique: true
        
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
   
});

const User = mongoose.model('User', userSchema);

module.exports = User;