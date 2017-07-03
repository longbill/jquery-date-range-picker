(function () {
    'use strict';

    var gulp = require('gulp'),
        gutil = require("gulp-util"),
        del = require('del'),
        beautify = require("gulp-jsbeautifier"),
        uglify = require("gulp-uglify"),
        cleanCSS = require('gulp-clean-css'),
        rename = require("gulp-rename"),
        header = require('gulp-header'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        browserSync = require('browser-sync').create();

    var pkg = require('./package.json');
    var banner = ['/**',
        ' * <%= pkg.name %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n');

    gulp.task('beautify', function() {
        gulp.src(['./src/*.css', './src/*.js'])
            .pipe(beautify())
            .pipe(gulp.dest('./src'));
    });

    gulp.task('dist:clean', function () {
        del.sync('./dist', {force: true});
        del.sync('./src/*.css', {force: true});
    });

    gulp.task('dist:sass', ['dist:clean'], function() {
        return gulp
            .src(['./src/*.scss'])
            .pipe(sass({outputStyle: 'expanded'}))
            .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 8']}))
            .pipe(gulp.dest('./dist'));
    });

    gulp.task('dist:styles', ['dist:clean', 'dist:sass'], function () {
        return gulp.src('./dist/*.css')
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(rename('daterangepicker.min.css'))
            .pipe(gulp.dest('./dist'))
            .on('error', gutil.log)
    });

    gulp.task('dist:script', ['dist:clean'], function () {
        return gulp.src('./src/*.js')
            .pipe(uglify())
            .pipe(rename('jquery.daterangepicker.min.js'))
            .pipe(header(banner, {pkg: pkg}))
            .pipe(gulp.dest('./dist'))
            .on('error', gutil.log)
    });

    gulp.task('dev:serve', ['dist:clean', 'dist:sass', 'dist:styles'], function() {
        browserSync.init({
            port: 3000,
            server: "./"
        });
        gulp.watch('./src/*.scss', ['simple-sass']);
        gulp.watch('./*.html').on('change', browserSync.reload);
    });

    gulp.task('default', ['dist:clean', 'dist:sass', 'dist:styles', 'dist:script'], function (cb) {
        gutil.log('Info :', gutil.colors.green('Distribution files v.' + pkg.version + ' are ready!'));
        cb(null)
    });

    gulp.task('dev', ['dist:clean', 'dist:sass', 'dist:styles', 'dist:script', 'dev:serve'], function (cb) {
        gutil.log('Info :', gutil.colors.green('Build complete!'));
        gutil.log('Info :', gutil.colors.green('Opening browser on http://localhost:3000/'));
        cb(null)
    });

})();