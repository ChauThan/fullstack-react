import React, { Component } from 'react';

class StateInputMulti06 extends Component {
  state = {
    fields: {
      name: '',
      email: ''
    },
    people: [],
  };

  onInputChange = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  }

  onFormSubmit = (evt) => {
    const people = [...this.state.people, this.state.fields];
    this.setState({
      people,
      fields: {
        name: '',
        email: ''
      },
    })

    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            placeholder="name"
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange} />
          <input
            type="text"
            name='email'
            placeholder="email"
            value={this.state.fields.email}
            onChange={this.onInputChange} />
          <input type="submit" />
        </form>
        <div>
          <h3>Names</h3>
          <ul>
            {this.state.people.map(({name, email}, i) =>
              <li key={i}>
                {name} ({email})
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default StateInputMulti06;