require('@babel/register');
require('dotenv').config();
const ssr = require('./middleware/ssr');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');

const app = express();

const Main = require('./views/Main');
const Api = require('./views/Api');


const PORT = process.env.PORT ?? 3000;

const sessionConfig = {
  name: 'JaysCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: false,
  }
};

app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(ssr);
app.use(session(sessionConfig))


app.use('/movies', moviesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.render(Main, {});
});

app.get('/api', (req, res) => {
  res.render(Api, {});
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
