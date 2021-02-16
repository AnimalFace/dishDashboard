import React from 'react';
import Home from './Home.jsx';
import UserRecipes from './UserRecipes.jsx';
import RecipeSearch from './RecipeSearch.jsx';
import RecipeForm from './RecipeForm.jsx';
import Recipe from './Recipe.jsx';
import GroceryListSearch from './GroceryListSearch.jsx';
import GroceryList from './GroceryList.jsx';
import { ajax } from 'jquery';
import StyleWrapper from './StyleWrapper.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      recipe: null,
      groceryList: null,
      userId: 1,
      recipes: [],
      groceryLists: null
    };
    this.getRecipesByUser = this.getRecipesByUser.bind(this);
    this.getRecipeByNameAndUser = this.getRecipeByNameAndUser.bind(this);
    this.submitRecipe = this.submitRecipe.bind(this);
  }

  componentDidMount() {

  }

  getRecipesByUser(userId, callback) {
    ajax({
      type: 'GET',
      url: `/api/user/${userId}/recipes`,
      dataType: 'json',
      success: (response) => {
        this.setState({
          recipes: response.rows
        })
      }
    });
  }

  getRecipeByNameAndUser(userAndRecipe, callback) {
    ajax({
      type: 'GET',
      url: `/api/user/${userAndRecipe.userId}/recipes/${userAndRecipe.recipe}`,
      dataType: 'json',
      success: (response) => {
        this.setState({
          recipe: response.rows[0]
        })
      }
    });
  }

  submitRecipe(recipe, callback) {
    ajax({
      type: 'POST',
      url:'/api/recipes/submit',
      data: recipe,
      success: () => {
        this.getRecipeByNameAndUser({recipe: 'Spaghetti', userId: 1}, ()=>{});
        this.setState({view: 'recipe'});
      },
      error: console.log,
    });
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  renderView() {
    const { view, userId, recipes, recipe} = this.state;
    if (view === 'home') {
      return <Home />
    } else if (view === 'userRecipes') {
      return <UserRecipes recipes={recipes} />
    } else if (view === 'recipeSearch') {
      return <RecipeSearch />
    } else if (view === 'createRecipe'){
      return <RecipeForm userId={userId} submitHandler={this.submitRecipe}/>
    } else if (view === 'recipe') {
      return <Recipe recipe={recipe}/>
    } else if (view === 'groceryListSearch') {
      return <GroceryListSearch />
    } else if (view === 'groceryList') {
      return <GroceryList />
    } else if (view === 'test') {
      return <div>test</div>
    }
  }

  render() {

    return (
      <StyleWrapper>
                <div className="navbar">
          <span className="logo"
            onClick={() => this.changeView('home')}>
            DishDashboard |
          </span>
          <span className={(this.state.view === 'recipeSearch' || this.state.view === 'recipe')
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('recipeSearch')}>
            Search Recipes |
          </span>
          <span className={this.state.view === 'createRecipe'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('createRecipe')}>
            Create a Recipe |
          </span>
          <span className={(this.state.view === 'groceryListSearch' || this.state.view === 'groceryList')
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('groceryListSearch')}>
            Grocery Lists
          </span>
        </div>
        <div className="main">
          {this.renderView()}
        </div>
      </StyleWrapper>
    );
  }
}

export default App;
