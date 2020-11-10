const users = require('./routes/users');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const authors = require('./routes/authors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require("cors");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false,
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('Hello from Express!')});

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards);
app.use('/api/authors', authors);

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Listening on port ${port}...`));