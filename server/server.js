const express = require("express");
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:8080"   // TODO
};

// app.use(cors(corsOptions));
app.use(cors());
// 11 middleware for more-secure headers
// app.use(helmet());
// parse request bodies of content-type application/json
app.use(express.json());
// TODO: use signed cookies
// const { COOKIE_SIG } = process.env;
// app.use(cookieParser(COOKIE_SIG));
app.use(cookieParser());
// statically serve everything in the build folder 
app.use('/build/', express.static(path.join(__dirname, '../build')));

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});