const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const path = require('path');

const DishDashboardController = require('./controllers/DishDashboardController.js');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

// app.get('/api/', DishDashboardController.get);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('DishDB is listening on port:', port);
});
