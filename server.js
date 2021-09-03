const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

// Use Route
app.use('/api/items', items);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
