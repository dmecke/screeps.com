var gulp = require("gulp");
var gutil = require('gulp-util');
var tslint = require("gulp-tslint");
var clean = require("gulp-clean");
var gulpRename = require("gulp-rename");
var gulpScreepsUpload = require('./lib/gulp-screeps-upload.js');
var typescript = require("gulp-typescript");
var project = typescript.createProject("tsconfig.json", { typescript: require("typescript")});
var config = require("./screeps.json");
const gulpDotFlatten = require('./lib/gulp-dot-flatten.js');
var PluginError = require("gulp-util").PluginError;

gulp.task("default", function()
{
    console.log("Run 'gulp deploy' to build the project and deploy all your changes to the screeps directory.");
});

gulp.task("lint", function()
{
    return gulp.src("src/**/*.ts").pipe(tslint()).pipe(tslint.report());
});

gulp.task("clean", function()
{
    return gulp.src(["build/tmp/", "build/dist/"], { allowEmpty: true }).pipe(clean());
});

gulp.task("compile", function ()
{
    return project
        .src()
        .pipe(project())
        .on("error", (error) => { throw new PluginError("gulp-typescript", "failed to compile: " + error) })
        .pipe(gulp.dest("build/tmp/"));
});

gulp.task("flatten", function()
{
    return gulp.src("build/tmp/**/*.js").pipe(gulpDotFlatten(0)).pipe(gulp.dest("build/dist/"));
});

gulp.task("upload-world", function()
{
    return gulp.src("build/dist/*.js").pipe(gulpRename((path) => path.extname = "")).pipe(gulpScreepsUpload(config.user.email, config.user.password, "world", 0));
});

gulp.task("upload-sim", function()
{
    return gulp.src("build/dist/*.js").pipe(gulpRename((path) => path.extname = "")).pipe(gulpScreepsUpload(config.user.email, config.user.password, "sim", 0));
});

gulp.task("build", gulp.series(["lint", "clean", "compile", "flatten"]));

gulp.task("deploy-world", gulp.series(["build", "upload-world"]));

gulp.task("deploy-sim", gulp.series(["build", "upload-sim"]));
