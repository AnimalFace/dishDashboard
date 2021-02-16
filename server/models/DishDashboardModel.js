const db = require('../../database/index.js');

const getRecipesByUser = (userId, callback) => {
  const q = `SELECT * FROM recipes WHERE creatorId = ${userId}`
  db.query(q, callback);
}

const submitRecipe = (recipe, callback) => {
  const { title, meal, cookTime, ingredients, intro, instructions, closer, keto, lowCarb, vegetarian, userId } = recipe;
  console.log('ingredients', `${ingredients}`);
  console.log('recipemodel', recipe);

  const q = `INSERT INTO recipes(title, meal, cookTime, ingredients, intro, instructions, closer, keto, lowCarb, vegetarian, creatorId) VALUES('${title}', '${meal}', '${cookTime}', ${ingredients}, ${intro}, ${instructions}, ${closer}, ${keto}, ${lowCarb}, ${vegetarian}, ${userId})`
  db.query(q, callback);
}

module.exports = {
  getRecipesByUser,
  submitRecipe
}

// INSERT INTO recipes(title, meal, cookTime, ingredients, intro, instructions, closer, keto, lowCarb, vegetarian, creatorId) VALUES( 'cake', 'desert', '10 mins', ARRAY['eggs', 'milk'], 'hi', ARRAY['one', 'two'], 'closer', false, true, false, 1);
