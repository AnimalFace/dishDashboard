const db = require('../../database/index.js');

const getRecipesByUser = (userId, callback) => {
  const q = `SELECT * FROM recipes WHERE creatorId = ${userId}`
  db.query(q, callback);
}

const getRecipeByNameAndUser = (userAndRecipe, callback) => {
  const { userId, recipeTitle} = userAndRecipe;
  const q = `SELECT * FROM recipes WHERE creatorId = ${userId} AND title = '${recipeTitle}'`
  console.log(q);
  db.query(q, callback);
}

const submitRecipe = (recipe, callback) => {
  const { title, meal, cookTime, ingredients, intro, instructions, closer, keto, lowCarb, vegetarian, userId } = recipe;
  const ketoB = JSON.parse(keto);
  const lowCarbB = JSON.parse(lowCarb);
  const vegetarianB = JSON.parse(vegetarian);
  const ingredientsArray = ingredients.split(',');
  const instructionsArray = instructions.split(',');
  const formatedIngredients = ingredientsArray.join("', '");
  const formatedInstructions = instructionsArray.join("', '");

  const q = `INSERT INTO recipes(title, meal, cookTime, ingredients, intro, instructions, closer, keto, lowCarb, vegetarian, creatorId) VALUES('${title}', '${meal}', '${cookTime}', ARRAY['${formatedIngredients}'], '${intro}', ARRAY['${formatedInstructions}'], '${closer}', ${ketoB}, ${lowCarbB}, ${vegetarianB}, ${userId})`;

  db.query(q, callback);
}

module.exports = {
  getRecipesByUser,
  getRecipeByNameAndUser,
  submitRecipe
}

// INSERT INTO recipes(title, meal, cookTime, ingredients, intro, instructions, closer, keto, lowCarb, vegetarian, creatorId) VALUES( 'cake', 'desert', '10 mins', ARRAY['eggs', 'milk'], 'hi', ARRAY['one', 'two'], 'closer', false, true, false, 1);

// SELECT * FROM recipes WHERE creatorId = 1 AND title = 'Spaghetti';