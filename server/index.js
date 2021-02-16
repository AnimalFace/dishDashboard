const express = require('express');
const DishDashboardController = require('./controllers/DishDashboardController.js')

const app = express();

const bodyParser = require('body-parser');
const path = require('path');



const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/user/:userId/recipes', DishDashboardController.getRecipesByUser);
app.get('/api/user/:userId/recipes/:recipeTitle', DishDashboardController.getRecipeByNameAndUser);

app.post('/api/recipes/submit', DishDashboardController.submitRecipe);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('DishDB is listening on port:', port);
});
