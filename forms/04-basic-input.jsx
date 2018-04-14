import React, { Component } from 'react';

class BasicInput04 extends Component {
  static displayName = "04-basic-input";
  state = { names: [] };

  onFormSubmit = (evt) => {
    const name = this.refs.name.value;
    const names = [...this.state.names, name];

    this.setState({names: names});
    this.refs.name.value = '';

    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" placeholder="name" ref="name" />
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

export default BasicInput04;