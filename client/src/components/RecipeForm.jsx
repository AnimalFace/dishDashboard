import React from 'react';
import $ from 'jquery';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      meal: '',
      cookTime: '',
      ingredients: [],
      intro: '',
      instructions: {},
      closer: '',
      keto: false,
      lowCarb: false,
      vegetarian: false,
      steps: [1],
      currentStep: null,
      ingredientToAdd: null
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInstructionInput = this.handleInstructionInput.bind(this);
    this.searchIngredients = this.searchIngredients.bind(this);
  }


  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleInstructionInput(event) {
    const newInstructions = {};
    const { instructions } = this.state;
    const { value, name } = event.target;
    for (let step in instructions) {
      newInstructions[step] = instructions[step];
    }
    newInstructions[name] = value;
    this.setState({
      instructions: newInstructions
    })
  }

  searchIngredients() {
    const { ingredientToAdd, ingredients } = this.state;
    if (!ingredientToAdd) {
      return;
    }
    //  search db for item,
    //    if not there ask if user wants to submit a new item on submit click,
    //      if yes, pop up a modal or another text field to allow input of a new item, with { item,detail } fields, dont allow submission of new item without details in details field
    //    if there, allow user to submit item to ingredients list as tuple [item, id] create a state object to reflect "Add" or "Search" on the button when there is or isn't a matching item in the database
    // this.props.itemSearchHandler(ingredient, () => {
    //   this.setState({
    //     ingredient: ''
    //   })
    // })
    const capitalizedIngredient = ingredientToAdd.charAt(0).toUpperCase() + ingredientToAdd.slice(1);
    const updatedIngredients = [];
    for (let i = 0; i < ingredients.length; i ++) {
      let currentIngredient = ingredients[i];
      updatedIngredients.push(currentIngredient);
    }
    updatedIngredients.push(capitalizedIngredient);

    this.setState({
      ingredients: updatedIngredients,
      ingredientToAdd: ''
    });
    $('.ingredient-input').val('');

  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, meal, cookTime, ingredients, intro, instructions, closer, keto, lowCarb, vegetarian } = this.state;
    const { userId } = this.props;
    const instructionsArray = [];
    for (let i = 0; i < Object.values(instructions).length; i++) {
      instructionsArray[i] = instructions[i];
    }
    // const instructionsString = '{' + instructionsArray.join(', ') + '}';
    const instructionsString = `{'${instructionsArray.join(`', '`)}'}`;
    const ingredientsString = `{'${ingredients.join(`', '`)}'}`;
    const recipe = {
      title: title,
      meal: meal,
      cookTime: cookTime,
      ingredients: ingredientsString,
      intro: intro,
      instructions: instructionsString,
      closer: closer,
      keto: keto,
      lowCarb: lowCarb,
      vegetarian: vegetarian,
      userId: userId
    };

    console.log('recipe:', recipe);

    this.props.submitHandler(recipe, () => {
      this.setState({
        title: '',
        meal: '',
        cookTime: '',
        ingredients: [],
        intro: '',
        instructions: {},
        closer: '',
        keto: false,
        lowCarb: false,
        vegetarian: false,
        steps: [1],
        currentStep: null,
        ingredientToAdd: null
      })
    })
    $('.recipe-form')[0].reset();
  }

  addStep() {
    const { steps } = this.state;
    let newStep = [steps.length + 1];
    this.setState({
      steps: steps.concat(newStep)
    })
  }

  removeStep() {
    const { steps } = this.state;
    this.setState({
      steps: steps.slice(0, steps.length)
    })
  }

  render() {
    const { steps, ingredients } = this.state;
    return (
        <div className="recipe-creator">
          <h2>New Recipe</h2>
          <form className="recipe-form" onSubmit={this.handleSubmit}>
            <input className="form-input" type="text" name="title" placeholder="Recipe Title" onChange={this.handleInput}></input><br></br>

            <select className="meal-select" name="meal" onChange={this.handleInput}>
              <option value="" selected disabled hidden>Meal</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Desert">Desert</option>
            </select><br></br>

            <select className="cookTime-select" name="cookTime" onChange={this.handleInput}>
              <option value="" selected disabled hidden>Cook Time</option>
              <option value="10mins">10 mins or less</option>
              <option value="20mins">10 - 20 mins</option>
              <option value="30mins">Around 30 mins</option>
              <option value="1hr">30 mins - 1 hr</option>
              <option value="2hrs">Around 2 hrs</option>
              <option value="12hrs">12 hrs or less</option>
              <option value="24hrs">24 hrs or less</option>
              <option value="over24">More than a day</option>
            </select><br></br>


            <input className="ingredient-input" type="text" name="ingredientToAdd" placeholder="Search and Add Ingredients" onChange={this.handleInput}></input>
            <button className="ingredient-search-button" type="button" onClick={this.searchIngredients}>Add / Search</button>
            <br></br>
            <div className="ingredients-view">
              <ul className="ingredients-list">
                {ingredients.map(ingredient => {
                  return (
                    <li className="ingredient">{ingredient}</li>
                  )
                })}
              </ul>
            </div>

            <textarea className="form-textarea" name="intro" placeholder="Intro" onChange={this.handleInput}></textarea><br></br>


            <ol>
              {
                steps.map(step => {
                  return (
                    <li className="instruction-step">
                      <textarea className="form-textarea" name={`${(step - 1)}`} placeholder={`Step ${step}: (+ to add a step)`} onChange={this.handleInstructionInput}></textarea>
                    </li>
                  )
                })
              }
            </ol>
            {/* <button className="remove-step-button" type="button" onClick={() => (this.removeStep())}>Remove a Step!</button> */}
            <button className="add-step-button" type="button" onClick={() => (this.addStep())}>Add a Step!</button><br></br>


            <textarea className="form-textarea" name="closer" placeholder="Closer" onChange={this.handleInput}></textarea><br></br>

            <input type="checkbox" name="lowCarb" value={true} onChange={this.handleInput}></input>
            <label for="lowCarb">Low-Carb</label>
            <input type="checkbox" name="vegetarian" value={true} onChange={this.handleInput}></input>
            <label for="vegetarian">Vegetarian</label>
            <input type="checkbox" name="keto" value={true} onChange={this.handleInput}></input>
            <label for="keto">Keto</label>
            <br></br>
            <button className="form-submit-button" type="submit">Create Recipe</button>
          </form>
        </div>
    )
  }

}

export default RecipeForm;