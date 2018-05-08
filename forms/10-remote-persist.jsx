import React, { Component } from 'react';
import Field from "./08-field-component.jsx";
import CourseSelect from "./09-course-select.jsx";
import validator from "validator";
import ApiClient from './api/client.js'

class RemotePersist extends Component {
  static displayName = __filename.split('/').slice(-1)[0];
  state = {
    fields: {
      name: '',
      email: '',
      department: '',
      course: '',
    },
    fieldErrors: {},
    people: [],
    _loading: false,
    _saveStatus: 'READY',
  };

  componentWillMount() {
    this.setState({ _loading: true });
    ApiClient.loadPeople().then((people) => {
      this.setState({ _loading: false, people: people });
    });
  }

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  }

  onFormSubmit = (evt) => {
    const person = this.state.fields;
    evt.preventDefault();

    if (this.validate()) return;

    const people = [...this.state.people, person];

    this.setState({ _saveStatus: 'SAVING' });
    ApiClient.savePeople(people)
      .then(() => {
        this.setState({
          people: people,
          fields: {},
          _saveStatus: 'SUCCESS',
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ _saveStatus: 'ERROR' });
      });
  }

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (errMessages.length) return true;

    return false;
  }

  render() {
    if (this.state._loading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.onFormSubmit}>

          <Field
            placeholder="Name"
            name="name"
            autocomplete="name"
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Name Required')}
          />

          <br />
          <Field
            placeholder="Email"
            name="email"
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (validator.isEmail(val) ? false : 'Invalid Email')}
          />

          <br />
          <CourseSelect
            department={this.state.fields.department}
            course={this.state.fields.course}
            onChange={this.onInputChange}
          />

          <br />
          {{
            SAVING: <input value='Saving...' type='submit' disabled />,
            SUCCESS: <input value='Saved!' type='submit' disabled />,
            ERROR: <input
              value='Save Failed - Retry?'
              type='submit'
              disabled={this.validate()}
            />,
            READY: <input
              value='Submit'
              type='submit'
              disabled={this.validate()}
            />,
          }[this.state._saveStatus]}
        </form>
        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({ name, email, department, course }, i) =>
              <li key={i}>
                {[name, email, department, course].join(' - ')}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default RemotePersist;