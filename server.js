const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
   .connect(db)
   .then(() => console.log('MongoDB Connected...'))
   .catch((err) => console.log(err));

// Use Route
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
