import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { recipes } = this.props;
    return (
      <div className="home">
      <h2>Home</h2>
      <h3>My Recipes</h3>
      <ul>
        {recipes.map(recipe => {
          return (<li>{recipe.title}</li>)
        })}
      </ul>
      </div>
    )
  }
}

export default Home;