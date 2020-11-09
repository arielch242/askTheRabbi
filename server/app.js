const users = require('./routes/users');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const authors = require('./routes/authors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');

mongoose.connect('mongodb+srv://admin:gazit111@gazit.duowd.mongodb.net/qna?authSource=admin&replicaSet=atlas-gh3qpt-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false,
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('Hello from Express!')

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards);
app.use('/api/authors', authors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});