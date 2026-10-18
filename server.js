const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectionDB = require('./config/db');

// dotenv configuration
dotenv.config();

// rest object
const app = express();

// connect to db
connectionDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
app.use('/api/v1/test', require('./routes/testRouters'));
app.use('/api/v1/auth', require('./routes/authRouters'));
app.use('/api/v1/user', require('./routes/userRouters'));
app.use('/api/v1/restaurant', require('./routes/restaurantRouters'));

app.get('/', (req, res) => {
  return res.status(200).send('<h1>Hello world</h1>');
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`server is running.... on port ${PORT}`.bgGreen.white);
});
