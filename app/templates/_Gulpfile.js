'use strict';

var gulp = require('gulp'),
connect   = require('gulp-connect'),
historyApiFallback = require('connect-history-api-fallback'),<% if(CssPreprocessorFormat == 'less'){ %>
less = require('gulp-less'),<% } else { %>
stylus = require('gulp-stylus'),<% } %>
jade = require('gulp-jade'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat'),
del = require('del');


// Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
    root: './public',
    hostname: '0.0.0.0',
    port: 9000,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  gulp.src('./app/jade/index.jade')
  .pipe(jade({
    locals: YOUR_LOCALS,
    pretty:true
  }))
  .pipe(gulp.dest('./public/'))
  .pipe(connect.reload());
});
<% if(CssPreprocessorFormat == 'less'){ %>
gulp.task('less', function () {
  gulp.src('./app/styles/main.less')
  .pipe(less())
  .pipe(gulp.dest('./public/css/'))
  .pipe(connect.reload());
});
<% } else { %>
gulp.task('stylus', function () {
  gulp.src('./app/styles/main.styl')
  .pipe(stylus({
    compress: false,
    'include css': true
  }))
  .pipe(gulp.dest('./public/css/'))
  .pipe(connect.reload());
});
<%} %>
gulp.task('jshint', function() {
  gulp.src('./app/js/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('cool-reporter'))
  .pipe(connect.reload());
});

gulp.task('concat', function() {
  gulp.src(['./app/js/*.js'])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./public/js/'));
});

gulp.task('clean', function (cb) {
  del(['./public/js/*.js','./public/styles/*.css','./public/fonts/*.*','./public/*.html'], cb);
});

gulp.task('copy', function() {<% if (fontawesome) { %>
  gulp.src('./bower_components/font-awesome/fonts/**.*')
  .pipe(gulp.dest('./public/fonts'));<%} %>
  gulp.src('./app/img/**.*')
  .pipe(gulp.dest('./public/img/'));
});

gulp.task('watch', function() {
  gulp.watch(['./app/jade/**/*.jade'], ['jade']);<% if(CssPreprocessorFormat == 'less'){ %>
  gulp.watch(['./app/styles/**/*.less'], ['less']);<% } else { %>
    gulp.watch(['./app/styles/**/*.styl'], ['stylus']);<%} %>
  gulp.watch(['./app/js/*.js'], ['jshint','concat']);
});
<% if(CssPreprocessorFormat == 'less'){ %>
gulp.task('default', ['clean','copy','jade','less','jshint','concat','server','watch']);<% } else { %>
gulp.task('default', ['clean','copy','jade','stylus','jshint','concat','server','watch']);
<%} %>
