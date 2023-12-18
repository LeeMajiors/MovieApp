const mongoose = require('mongoose');

const database_url = 'mongodb+srv://Leem:(password-removed)@cluster0.3hembv8.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(database_url, { useNewUrlParser: true })

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password_hash:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    api_key:{
        type: String,
        
    }
},{ collection: "users" })

// module.exports = mongoose.model('user',UserSchema)
exports.userDatabase = mongoose.model('userDatabase',UserSchema)