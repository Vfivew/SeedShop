const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8000;

server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth);

server.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

server.post('/register', (req, res) => {
  const { email, password } = req.body;
  console.log(`Received registration request for email: ${email}`);

  res.status(201).json({ message: 'Registration successful' });
});

server.use(router);

server.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});