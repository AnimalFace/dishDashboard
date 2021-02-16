const DishDashboardModel = require('../models/DishDashboardModel.js');

const getRecipesByUser = (request, response) => {
  const { userId } = request.params;
  DishDashboardModel.getRecipesByUser(userId, (err, recipes) => {
    if (err) {
      response.status(400).send(err)
    } else {
      response.status(200).send(recipes)
    }
  })
}

const submitRecipe = (request, response) => {
  const recipe = request.body;
  DishDashboardModel.submitRecipe(recipe, (err, data) => {
    if (err) {
      response.status(400).send(err)
    } else {
      response.status(200).send(data)
    }
  })
}

module.exports = {
  getRecipesByUser,
  submitRecipe
}