require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json()); 

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/whatsappClone')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('Back-end server is running!!');
});

app.get('/api/greet/:name', (req, res) => {
    res.send(`Hello, ${req.params.name}!`);
});  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});