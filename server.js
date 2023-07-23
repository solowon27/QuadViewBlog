const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars'); 
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set the view engine to use Handlebars
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Set the views directory to point to the correct location
app.set('views', path.join(__dirname, 'views'));


app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
