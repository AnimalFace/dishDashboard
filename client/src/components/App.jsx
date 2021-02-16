import React from 'react';
import Home from './Home.jsx';
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

  submitRecipe(recipe, callback) {
    ajax({
      type: 'POST',
      url:'/api/recipes/submit',
      data: recipe,
      success: () => {
        this.getRecipesByUser();
        this.setState({view: 'home'});
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
    const { view, userId} = this.state;
    if (view === 'home') {
      return <Home />
    } else if (view === 'recipeSearch') {
      return <RecipeSearch />
    } else if (view === 'createRecipe'){
      return <RecipeForm userId={userId} submitHandler={this.submitRecipe}/>
    } else if (view === 'recipe') {
      return <Recipe />
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
