const express = require('express');
const mongoose = require('mongoose');


const app = express();
// UPDATE
const updateDev = require('./autoupdate/update') ;


// Connect with MongoDB Atlas
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

// Importing Route Handlers.
const deviceRoutes = require('./api/routes/devices');
const developerRoutes = require('./api/routes/developers');
// const testRoutes = require('./api/routes/tests'); // only for testing purpose... will be removed later.
// const userRoutes = require('./api/routes/users');

// Importing Models.
//const Device = require('./api/models/device');
//const Developer = require('./api/models/developer');
//const Test = require('./api/models/test'); // only for testing purpose... will be removed later.
//const User = require('./api/models/user');

// Add Middleware to add the Access-Control-Allow-Origin header to the incoming requests.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET');
    return res.status(200).json({});
  }
  next();
});

// Log the incoming requests.
if (process.env.NODE_ENV !== 'production') {
  const logger = require('morgan');
  app.use(logger('combined'), (req, res, next) => {
    next();
  });
}

//Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handle /devices and /about routes.
app.use('/devices', deviceRoutes);
app.use('/about', developerRoutes);
// app.use('/test', testRoutes); // only for testing purpose... will be removed later.
// app.use('/admin', userRoutes);

// UPDATE
app.get('/testing', updateDev.getAllDevelopers) ;
app.get('/testing/:developerUsername', updateDev.getIdDeveloper) ;

// Handle errors on invalid routes.
app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});

module.exports = app;
