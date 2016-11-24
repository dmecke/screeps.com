var gulp = require('gulp');
var tslint = require('gulp-tslint');
var clean = require('gulp-clean');
var typescript = require('gulp-typescript');
var project = typescript.createProject('tsconfig.json', { typescript: require('typescript')});
var flatten = require('gulp-flatten');

gulp.task('default', function()
{
    console.log('Run "gulp deploy" to build the project and deploy all your changes to the screeps directory.');
});

gulp.task('lint', function()
{
    return gulp.src('src/**/*.ts').pipe(tslint()).pipe(tslint.report());
});

gulp.task('clean', function()
{
    return gulp.src(['build/tmp/', 'build/dist/'], { allowEmpty: true }).pipe(clean());
});

gulp.task('compile', function ()
{
    return project.src().pipe(project()).pipe(gulp.dest('build/tmp/'));
});

gulp.task('flatten', function()
{
    return gulp.src('build/tmp/**/*.js').pipe(flatten()).pipe(gulp.dest('build/dist/'));
});

gulp.task('upload', function()
{
    return gulp.src('build/dist/*.js').pipe(gulp.dest('C:\\Users\\dmecke\\AppData\\Local\\Screeps\\scripts\\screeps.com\\build'));
});

gulp.task('build', gulp.series(['lint', 'clean', 'compile', 'flatten']));
gulp.task('deploy', gulp.series(['build', 'upload']));
