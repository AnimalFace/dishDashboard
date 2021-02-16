import React from 'react';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  renderTag(tag, tagname) {
    if (tag) {
      return <p>{tagname}</p>;
    }
  }

  render() {

    if (this.props.recipe) {
      const { id, title, meal, cooktime, ingredients, intro, instructions, closer, keto, lowCarb, vegetarian, creatorId } = this.props.recipe;
      return (
        <div className="recipe">

        <h2>{title}</h2>
        <p>Meal: {meal}</p>
        <p>Cooking Time: {cooktime}</p>

        <p>ingredients</p>
        <ul>
          {ingredients.map(ingredient => {
            return (<li>{ingredient}</li>)
          })}
        </ul>

        <p>Introduction</p>
        <p>{intro}</p>

        <p>instructions</p>
        <ul>
          {instructions.map(instruction => {
            return (<li>{instruction}</li>)
          })}
        </ul>

        <p>Closing Comments</p>
        <p>{closer}</p>

        <p>{this.renderTag(keto, '*keto')}</p>
        <p>{this.renderTag(lowCarb, '*lowCarb')}</p>
        <p>{this.renderTag(vegetarian, '*vegetarian')}</p>
        </div>
      )
    }
    return (
      <div className="recipe">
        <h2>Loading</h2>
      </div>
    )

  }
}

export default Recipe;

