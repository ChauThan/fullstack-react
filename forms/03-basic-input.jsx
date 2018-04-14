import React, { Component } from 'react';

class BasicInput03 extends Component {
  static displayName = "Basic Input 03";

  onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.refs.name.value);
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" placeholder="name" ref="name"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default BasicInput03;