import React from 'react';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const recipe = this.state;
    this.props.submitHandler(recipe, () => {
      this.setState({
        title: '',
        meal: '',
        cookTime: '',
        ingredients: '',
        intro: '',
        instructions: '',
        closer: '',
        keto: false,
        lowCarb: false,
        vegetarian: false
      })
    })
  }

  render() {
    return (
      <div className="recipeForm">
        <div className="recipe-editor">
          <h2>New Recipe</h2>
          <form onSubmit={this.handleSubmit}>
            <input className="form-input" type="text" name="title" placeholder="Recipe Title" onChange={this.handleInput}></input><br></br>

            <select className="meal-select"name="meal" default="meal">
            <option value="" selected disabled hidden>Meal</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Desert">Desert</option>
            </select><br></br>

            <select className="meal-select"name="meal">
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



            <textarea className="form-textarea" name="intro" placeholder="Intro" onChange={this.handleInput}></textarea><br></br>
            {<textarea className="form-textarea" name="instructions" placeholder="Instructions + to add a step" onChange={this.handleInput}></textarea>}<br></br>

            <textarea className="form-textarea" name="closer" placeholder="Closer" onChange={this.handleInput}></textarea><br></br>
            <label for="keto">Keto</label>
            <input type="checkbox" name="keto" value={true} onChange={this.handleInput}></input>
            <label for="lowCarb">Low-Carb</label>
            <input type="checkbox" name="lowCarb" value={true} onChange={this.handleInput}></input>
            <label for="vegetarian">Vegetarian</label>
            <input type="checkbox" name="vegetarian" value={true} onChange={this.handleInput}></input>
            <br></br>
            <button className="form-submit-button" type="submit">Create Recipe</button>
          </form>
        </div>
      </div>
    )
  }

}

export default RecipeForm;