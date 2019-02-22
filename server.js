const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3002;
const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated';
const COOKIE_SECRET = '19djaspidjqopidjq';
const COOKIE_OPTIONS = {
  httpOnly: true, // prevent js / client access to the cookie
  secret: !dev, // not https only during development
  signed: true // allow us to verify the source of the signed cookie
};

const authenticate = async (email, password) => {
  // mock authentication of matching user login credentials with a fake free api endpoint at json typicode
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  return data.find((user) => user.email === email && user.website === password);
};

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  // most secure type of cookie with a signed cookie instead of default
  // these need a cookie secret (usually put this in an env file to be hidden)
  server.use(cookieParser(COOKIE_SECRET));

  server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticate(email, password);

    if (!user) {
      // note to anyone studying this code (got a couple messages):
      // usually res.status.send or res.send is enough to get back to the user -
      // we return here to stop the rest of the function though if the user enters
      // credentials wrong
      return res.status(403).send('Invalid email or password.');
    }

    const userData = {
      name: user.name,
      email: user.email,
      // type of authentication
      type: AUTH_USER_TYPE
    };

    // create a cookie with express based on response
    // a signed cookie 3 args - name, value (e.g. userData), options object with settings
    res.cookie('token', userData, COOKIE_OPTIONS);
    res.json(userData); // send back to client the userData
  });

  server.get('/', (req, res) => {
    res.status(200);
  });

  // let the remainder of requests be handled by nextjs's servers
  server.get('*', (req, res) => {
    return handle(req, res); // let next's getRequestHandler handle the req / res
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`App is listening on port ${port}.`);
  });
});
