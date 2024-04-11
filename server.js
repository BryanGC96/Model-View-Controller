const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up handlebars.js engine with custom helpers if any.
const hbs = exphbs.create({ helpers });

// Handles session cookie settings, session storage, and session behavior.
const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000, // the age of the session cookie in miliseconds = 5 minutes.
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false, // Optimize server performance by preventing unnecesary writes to the session store.
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess)); // Middleware to handle creating and managing sessions for incoming requests.

  // Inform Express.js on wich template engine to use
  app.engine('handlebars', hbs.engine); // Associates 'handlebars' extension to the 'handlebars' engine.
  app.set('view engine', 'handlebars'); // Tells 'Express' to use the 'handlebars' template engine for rendering views.

  // Body Parsing Middleware.
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static file serving middleware.
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(routes);

  // Synchronizes the database schema with the models defined using sequelize.
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });