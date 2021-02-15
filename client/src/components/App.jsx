import React from 'react';
// import RecipeSearch from './RecipeSearch.jsx';
import RecipeForm from './RecipeForm.jsx';
// import Recipe from './Recipe.jsx';
// import GroceryListSearch from './GroceryListSearch.jsx';
// import GroceryList from './GroceryList.jsx';
import { ajax } from 'jquery';
import StyleWrapper from './StyleWrapper.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'createRecipe',
      recipe: null,
      groceryList: null,
      user: 'testUser',
      recipes: null,
      groceryLists: null
    };

  }

  componentDidMount() {

  }

  // getRecipesByUser() {
  //   ajax({

  //   });
  // }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  renderView() {
    const {view} = this.state;
    // if (view === 'recipeSearch') {
    //   return <RecipeSearch />
    // } else
     if (view === 'createRecipe'){
      return <RecipeForm />
    // } else if (view === 'recipe') {
    //   return <Recipe />
    // } else if (view === 'groceryListSearch') {
    //   return <GroceryListSearch />
    // } else if (view === 'groceryList') {
    //   return <GroceryList />
    // } else
    //  if (view === 'test') {
    //   return <div>test</div>
    }
  }

  render() {

    return (
      <StyleWrapper>
                {/* <div className="navbar">
          <span className="logo"
            onClick={() => this.changeView('recipeSearch')}>
            DishDirectory
          </span>
          <span className={(this.state.view === 'recipeSearch' || this.state.view === 'recipe')
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('recipeSearch')}>
            Search Recipes
          </span>
          <span className={this.state.view === 'createRecipe'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('createRecipe')}>
            Create a Recipe
          </span>
          <span className={(this.state.view === 'groceryListSearch' || this.state.view === 'groceryList')
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('groceryListSearch')}>
            Grocery Lists
          </span>
        </div> */}

        <div className="main">
          {this.renderView()}
        </div>
      </StyleWrapper>
    );
  }
}

export default App;
