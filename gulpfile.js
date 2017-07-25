

const gulp = require('gulp');
const setUpDriver = require('./setUpTest');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters'); 
var screenShotReporter = require('jasmine-screenshot-reporter');
 var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
gulp.task('default', () =>    
    gulp.src('spec/*.spec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
        .pipe(jasmine({
            reporter: new reporters.HTMLReporter()
           
        }))
       
);
