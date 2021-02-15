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
    const post = this.state;
    this.props.submitHandler(post, () => {
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
          <textarea className="form-textarea" name="intro" placeholder="Intro" onChange={this.handleInput}></textarea><br></br>
          {<textarea className="form-textarea" name="instructions" placeholder="Instructions + to add a step" onChange={this.handleInput}></textarea>}<br></br>

          <textarea className="form-textarea" name="closer" placeholder="Closer" onChange={this.handleInput}></textarea><br></br>
          <label for="keto">Keto</label>
          <input type="checkbox" name="keto" value={true} onChange={this.handleInput}></input>
          <label for="lowCarb">Low Carbs</label>
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