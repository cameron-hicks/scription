const express = require("express");
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { COOKIE_SIG } = require('./secrets.js');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"   // TODO
};

app.use(cors(corsOptions));
// parse request bodies of content-type application/json
app.use(express.json());
// use signed cookies
// app.use(cookieParser(COOKIE_SIG));
app.use(cookieParser());
// statically serve everything in the build folder 
app.use('/build/', express.static(path.join(__dirname, '../build')));

app.use('*', (req, res, next) => {
  console.log('current cookies', req.cookies);
  next();
})
// route all API requests through api.js
app.use('/api', apiRouter);
// route all auth requests through auth.js
app.use('/auth', authRouter);


// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200)
            .sendFile(path.join(__dirname, '../public/index.html'));
});


//ERROR HANDLING
app.use((err, req, res, next) => {
  const error = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {
      err: 'A server error occured',
    },
  };
  error.message = err.message;
  if (err.status) error.status = err.status;

  console.log('SERVER ERROR: ', error.message);
  res.status(error.status).send(error.message);   
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});