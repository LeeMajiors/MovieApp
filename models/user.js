const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        
    },
    password:{
        type: String,
        required: true
    },
    api_key:{
        type: String,
        unique: true
    },
    userId:{
        type: String,
        unique: true,
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