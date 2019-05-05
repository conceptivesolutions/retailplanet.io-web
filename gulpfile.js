/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

const paths = {
  static_styles: {
    src: 'src/styles/static/*.scss',
    dest: 'static/styles',
  },
  semantic_themes: {
    src: 'node_modules/semantic-ui-css/themes/**',
    dest: 'static/styles/themes/',
  },
};

/**
 * Cleans the current workingdir and removes all autogenerated files
 */
function clean() {
  return del([paths.static_styles.dest, paths.semantic_themes.dest]);
}

/**
 * Compiles the static scss to css
 */
function styles() {
  return gulp.src(paths.static_styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.static_styles.dest));
}

/**
 * Copy semantic-themes to our local folder
 */
function semanticThemes() {
  return gulp.src(paths.semantic_themes.src)
    .pipe(gulp.dest(paths.semantic_themes.dest));
}

exports.clean = clean;
exports.styles = styles;
exports.semanticFonts = semanticThemes;

exports.default = gulp.series(clean, gulp.parallel(styles, semanticThemes));
