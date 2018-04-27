import React, { Component } from 'react';

class BasicValidation07 extends Component {
  static displayName = " 07 Basic Validation"
  state = {
    fields: {
      name: '',
      email: ''
    },
    fieldErrors: {},
    people: [],
  };

  onInputChange = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  }

  onFormSubmit = (evt) => {
    const people = [...this.state.people];

    const person = this.state.fields;
    const fieldErrors = this.validate(person);
    this.setState({ fieldErrors });
    evt.preventDefault();

    if (Object.keys(fieldErrors).length) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: ''
      },
    })

    evt.preventDefault();
  }

  validate = (person) => {
    const errors = {};

    if (!person.name) errors.name = 'Name Required';

    if (!person.email) errors.email = 'Email Required';

    //if(person.email && !isEmail(person.email)) errors.email = 'Invalid Email';

    return errors;
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
          <span style={{ color: 'red' }}>{this.state.fieldErrors.name}</span>
          <br />
          <input
            type="text"
            name='email'
            placeholder="email"
            value={this.state.fields.email}
            onChange={this.onInputChange} />
          <span style={{ color: 'red' }}>{this.state.fieldErrors.email}</span>
          <br />
          <input type="submit" />
        </form>
        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({ name, email }, i) =>
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

export default BasicValidation07;