const mongoose = require('mongoose');
const database_url = 'mongodb+srv://Leem:(password-removed)@cluster0.3hembv8.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(database_url, { useNewUrlParser: true })