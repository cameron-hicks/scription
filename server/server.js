const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
// CORS allows for requests to cross-origin resources, ie, things on other people's pages
const cors = require("cors");
const apiRouter = require('./routes/api');

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"   // what should this be?
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// statically serve everything in the build folder 
app.use('/build/', express.static(path.join(__dirname, '../build')));
// route all API requests through api.js
app.use('/api', apiRouter);



console.log('environment printing from server.js:', process.env.NODE_ENV);
const environment = process.env.NODE_ENV || 'production';

if (environment === 'production') {
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200)
              .sendFile(path.join(__dirname, '../public/index.html'));
  });
}

// serve styles
// app.get('/index.scss', (req, res) => {
//   return res.status(200)
//             .header({ 'Content-Type': 'text/css; charset=UTF-8' })
//             .sendFile(path.join(__dirname, '../src/scss/index.scss'));
// });


//ERROR HANDLING
app.use( (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {
      err: 'An error occured',
    },
  };
  const errorObj = Object.assign(defaultErr);
  errorObj.message = err.message; // expect to overwrite message param of defaultErr
  if (err.status) errorObj.status = err.status;

  console.log('ERROR: ', errorObj.message);
  res.status(errorObj.status).send(errorObj.message);   
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});