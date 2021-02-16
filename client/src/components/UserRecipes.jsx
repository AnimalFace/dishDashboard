import React from 'react';

class UserRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { recipes } = this.props;
    return (
      <div className="userRecipes">
      <h2>UserRecipes</h2>
      </div>
    )
  }
}

export default UserRecipes;