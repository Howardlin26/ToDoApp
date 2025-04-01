// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');  
const taskRoutes = require('./routes/task');  

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// connect MongoDB db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

// set API route
app.use('/api/users', userRoutes); 
app.use('/api/tasks', taskRoutes);  

// test
app.get('/', (req, res) => {
    res.send('Server is running');
});

//set server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
