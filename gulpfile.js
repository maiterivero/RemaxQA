

const gulp = require('gulp');
const setUpDriver = require('./setUpTest');
const jasmine = require('gulp-jasmine');
const reporters = require('./html_reporter.js');
gulp.task('default', () =>    
    gulp.src('spec/*.spec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
        .pipe(jasmine({
            reporter: new reporters.HTMLReporter()
           
        }))
       
);
