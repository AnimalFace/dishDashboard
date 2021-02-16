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

const getRecipeByNameAndUser = (request, response) => {
  DishDashboardModel.getRecipeByNameAndUser(request.params, (err, recipe) => {
    if (err) {
      response.status(400).send(err)
    } else {
      response.status(200).send(recipe)
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
  getRecipeByNameAndUser,
  submitRecipe
}