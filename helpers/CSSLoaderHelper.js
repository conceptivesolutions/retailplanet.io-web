const path = require('path');

const avoidPaths = ['node_modules', 'static'].map(d => path
    .join(__dirname, '..', d)
  .replace(/\\/g, '/'));

module.exports = {

  canBeTransformed: function (pathToCheck) {
    return !avoidPaths.some(function (v) {
      const p = pathToCheck.substr(0, pathToCheck.lastIndexOf('/') + 1);
      return p.includes(v);
    });
  }

};