import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiClient from './api/client.js'

class CourseSelectComponent extends Component {
  static displayName = " 09 Field Component Form";

  state = {
    department: null,
    course: null,
    courses: [],
    _loading: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      department: nextProps.department,
      course: nextProps.course
    })
  }

  onSelectDepartment = (evt) => {
    const department = evt.target.value;
    const course = null;

    this.props.onChange({ name: 'department', value: department });
    this.props.onChange({ name: 'course', value: course });

    this.setState({ department, course });

    this.fetch(department);
  }

  onSelectCourse = (evt) => {
    const course = evt.target.value;
    this.setState({ course });
    this.props.onChange({ name: 'course', value: course });
  }

  fetch = (department) => {
    this.setState({ _loading: true });
    ApiClient.getCourse(department).then((courses) => {
      this.setState({ courses, _loading: false });
    });
  }

  renderDepartmentSelect = () => {
    return (
      <select name="deparment" id="department" onChange={this.onSelectDepartment} value={this.state.department || ''} >
        <option value="">Which department?</option>
        <option value="core">Core</option>
        <option value="electives">Electives</option>
      </select>
    );
  }

  renderCourseSelect = () => {
    if (this.state._loading) {
      return (
        <div>Loading</div>
      )
    }

    if (!this.state.department || !this.state.courses.length) return <span />;

    return (
      <select
        onChange={this.onSelectCourse}
        value={this.state.course || ''}
      >

        {[
          <option value='' key='course-none'>
            Which course?
          </option>,
          ...this.state.courses.map((course, i) => (
            <option value={course} key={i}>
              {course}
            </option>
          )),
        ]}
      </select>
    );
  }

  render() {

    return (
      <div>
        {this.renderDepartmentSelect()}
        <br />
        {this.renderCourseSelect()}
      </div>
    );
  }
}

CourseSelectComponent.propTypes = {
  department: PropTypes.string,
  course: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CourseSelectComponent;