import Core from './core.json';
import Electives from './electives.json';

export default (function (department) {
  const Courses = {
    core: Core,
    electives: Electives
  };

  var getCourse = (department) => {
    return {
      then: function (cb) {
        setTimeout(() => { cb(Courses[department]); }, 1000)
      }
    }
  }


  return {
    getCourse
  }
}());