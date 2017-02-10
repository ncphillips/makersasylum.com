const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const siteRoot = '_site';
const cssFiles = 'assets/css/.?(s)css';
const jsFiles = [
                 'assets/js/_source/jquery.min.js',
                 'assets/js/_source/bootstrap.min.js',
                 'assets/js/_source/main.js'
                ];

gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('js', () => {
  gulp.src(jsFiles)
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('assets/js/'));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('bundle', [
    'exec',
    'jekyll',
    'build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, jsFiles, ['css', 'js']);
});

gulp.task('default', ['css', 'js', 'jekyll', 'serve']);
