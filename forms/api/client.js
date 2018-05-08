import Core from './core.json';
import Electives from './electives.json';

export default (function (department) {
  const Courses = {
    core: Core,
    electives: Electives
  };

  var count = 1;

  var getCourse = (department) => {
    return {
      then: function (cb) {
        setTimeout(() => { cb(Courses[department]); }, 1000)
      }
    }
  }

  var loadPeople = () => {
    return {
      then: function(cb){
        setTimeout(() => {
          cb(JSON.parse(localStorage.people || '[]'));
        }, 1000);
      }
    }
  }

  var savePeople = (people) =>{
    const success = !!(count++ % 2);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({ success });

        localStorage.people = JSON.stringify(people);
        return resolve({ success });
      }, 1000);
    });
  }

  return {
    getCourse,
    loadPeople,
    savePeople
  }
}());