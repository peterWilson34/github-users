var gulp= require('gulp'),
    concat=require('gulp-concat'),
    sass=require('gulp-sass'),
    watch = require('gulp-watch'),
    rename=require('gulp-rename');


// gulp.task('foundation',function(){
//   gulp.src(['node_modules/foundation-sites/scss/foundation.scss']).
//   pipe(sass()).
//   pipe(gulp.dest('src/css/'))
// })
gulp.task('sass',function(){
  gulp.src(['src/sass/base.scss','src/sass/*.scss']).
  pipe(concat('app.scss')).
  pipe(sass()).
  pipe(gulp.dest('src/css/'))
})
gulp.task('styles',function(){
  gulp.src(['src/css/app.css','src/css/*.css']).
  pipe(concat('styles.css')).
  pipe(gulp.dest('dist/css/'))

})
gulp.task('scripts',function(){
  gulp.src(['src/js/app.js','src/js/routes.js','src/js/directives/*.js','src/js/factories/*.js','src/js/controllers/*.js']).
  pipe(concat('scripts.js')).
  pipe(gulp.dest('dist/js/'))
})

gulp.task('watch', function() {

  // Watch .scss & .css files
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/css/*.css', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/**/*.js', ['scripts']);
  gulp.watch('src/js/**/*.js', ['scripts']);


});

gulp.task('default',['sass','styles','scripts','watch']);
