const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const Message = require('./models/Message');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/whatsappClone')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/', (req, res) => {
  res.send('Back-end server is running!!');
});

// app.get('/api/messages', (req, res) => {
//     res.json(["Message 1", "Message 2", "Message 3"]);
// });

app.get('/api/greet/:name', (req, res) => {
    res.send(`Hello, ${req.params.name}!`);
});  

app.post('/api/messages', async (req, res) => {
    const message = new Message({ content: 'Hello, WhatsApp!', sender: 'Diego' });
    try {
      const savedMessage = await message.save();
      res.send(savedMessage);
    } catch (err) {
      res.status(400).send(err);
    }
});

app.get('/api/messages', async (req, res) => {
    try {
      const messages = await Message.find();
      res.send(messages);
    } catch (err) {
      res.status(500).send(err);
    }
});
  


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});