const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to DataBase    
const DB = 'mongodb://localhost:27017/Social_Media'
// const DB = 'mongodb+srv://amit-singh_1:9576435668@cluster0-49vnb.mongodb.net/Social_Media';
 mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('MngoDb Connected Successfully...'))
.catch(console.log)


app.use(cors())

// Body Parser     
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Bringing All Routes
const authRoutes = require('./api/routes/authRoutes');
const userRoutes = require('./api/routes/userRoutes');
const postRoutes = require('./api/routes/postRoutes');

// Actual Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
