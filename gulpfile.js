var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: false});

var paths = {
  dist: './dist',
  static: './app/static/**/*',
  staticDir: './app/static',
  stylesheets: './app/stylesheets/**/*.sass'
};

gulp.task('sass', function () {
  return gulp.src(paths.stylesheets)
    .pipe($.rubySass({ "sourcemap=none": true }))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(paths.staticDir));
});

gulp.task('build', ['sass'], function () {
  return gulp.src(paths.static)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
  gulp.watch([paths.stylesheets, paths.static], ['build']);
});

gulp.task('webserver', function () {
  gulp.src(paths.dist)
    .pipe($.webserver({
      host: '0.0.0.0',
      livereload: true,
      open: true
    }));
});

gulp.task( 'default', [ 'sass', 'build', 'webserver', 'watch' ] );
gulp.task('deploy', ['build'], function () {
  gulp.src(paths.dist + '/**/*')
    .pipe($.ghPages('https://github.com/rileyjshaw/fingerprint.git', 'origin'));
});
