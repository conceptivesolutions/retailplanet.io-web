/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

const paths = {
  static_styles: {
    src: 'src/styles/static/*.scss',
    dest: 'static/styles',
  },
};

/**
 * Cleans the current workingdir and removes all autogenerated files
 */
function clean() {
  return del([paths.static_styles.dest]);
}

/**
 * Compiles the static scss to css
 */
function styles() {
  return gulp.src(paths.static_styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.static_styles.dest));
}

exports.clean = clean;
exports.styles = styles;

exports.default = gulp.series(clean, styles);
