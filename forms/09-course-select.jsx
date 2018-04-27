import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiClient from './api/client.js'

class CourseSelectComponent extends Component {
  state = {
    department: null,
    course: null,
    courses: null,
    _loading: false,
  }

  componentWillMount(){
    this.setState({ _loading: true });
    ApiClient.getCourse("core").then((courses) => {
      this.setState({ courses, _loading: false });
    });
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      department: nextProps.department,
      course: nextProps.course
    })
  }


  render() {
    if (this.state._loading) {
      return (
        <div>Loading</div>
      )
    }

    return (
      <div>
        Course
        <ul>
          {this.state.courses.map((course, i) => <li key={i}>{course}</li>)}

        </ul>
      </div>
    );
  }
}

CourseSelectComponent.propTypes = {
  department: PropTypes.string,
  course: PropTypes.string,
  //onChange: PropTypes.func.isRequired,
};

export default CourseSelectComponent;