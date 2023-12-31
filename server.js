const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const helpers = require('./utils/helpers');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const handlebars = require('handlebars');

handlebars.registerHelper('truncate', function (text, length) {
  return text.slice(0, length);
});

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// Custom handlebars helpers
const hbs = exphbs.create({helpers});


// Set the view engine to use Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set the views directory to point to the correct location
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static route for serving the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
// app.use(routes);
app.use(require('./controllers/blog-routes'));
app.use(require('./controllers/user-routes'));
app.use(require('./controllers/comment-routes'));

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
