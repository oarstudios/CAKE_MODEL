require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoutes)

const PORT = process.env.PORT;

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });

app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
});
