const express = require("express");
const path = require('path');
const cors = require("cors");
const apiRouter = require('./routes/api');

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"   // TODO
};

app.use(cors(corsOptions));
// parse request bodies of content-type application/json
app.use(express.json());
// statically serve everything in the build folder 
app.use('/build/', express.static(path.join(__dirname, '../build')));
// route all API requests through api.js
app.use('/api', apiRouter);


// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200)
            .sendFile(path.join(__dirname, '../public/index.html'));
});

// serve styles
// app.get('/index.scss', (req, res) => {
//   return res.status(200)
//             .header({ 'Content-Type': 'text/css; charset=UTF-8' })
//             .sendFile(path.join(__dirname, '../src/scss/index.scss'));
// });


//ERROR HANDLING
app.use((err, req, res, next) => {
  const error = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {
      err: 'A server error occured',
    },
  };
  error.message = err.message; // expect to overwrite message param of defaultErr
  if (err.status) error.status = err.status;

  console.log('SERVER ERROR: ', error.message);
  res.status(error.status).send(error.message);   
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});