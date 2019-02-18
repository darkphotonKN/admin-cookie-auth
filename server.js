const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3003;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

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
