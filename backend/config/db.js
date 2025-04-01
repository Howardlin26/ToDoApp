const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todo-app', { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB 已成功連接');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // exit
    }
}

module.exports = connectDB;