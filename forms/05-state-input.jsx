import React, { Component } from 'react';

class StateInput05 extends Component {
  static displayName = "05 state input"
  state = {
    names: [],
    name: ""
  };

  onFormSubmit = (env) => {
    const names = [...this.state.names, this.state.name];
    this.setState({ names: names, name: '' });
    evt.preventDefault();
  }

  onNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={this.onNameChange} />
          <input type="submit" />
        </form>
        <div>
          <h3>Names</h3>
          <ul>
            {this.state.names.map((name, i) =>
              <li key={i}>
                {name}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default StateInput05;