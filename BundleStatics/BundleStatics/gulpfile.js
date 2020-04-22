//Step 1: Import gulp libraries
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    gzip = require("gulp-gzip");

//Step 2: Setting path contain css and js file
var paths = {
    webroot: "./wwwroot/"
};

//Step 3: Setting path file will get to gzip 
paths.minJs = paths.webroot + "scripts/**/*.min.js"; // only get min file from scripts folder
paths.minCss = paths.webroot + "styles/**/*.min.css";

//Step 4: Folder will store new gzip file
paths.concatGzJsDest = paths.webroot + "scripts";
paths.concatGzCssDest = paths.webroot + "styles";

//Step 5: Create command to clear gzip 
gulp.task("clean:gzJs", done => rimraf(paths.concatGzJsDest, done));
gulp.task("clean:gzCss", done => rimraf(paths.concatGzCssDest, done));
gulp.task("clean", gulp.series(["clean:gzCss", "clean:gzJs"]));

//Step 6: Create command to gzip css & js file
gulp.task('gzip:gzJs', function () {
    return gulp.src(paths.minJs)
        .pipe(gzip())
        .pipe(gulp.dest(paths.concatGzJsDest));
});

gulp.task('gzip:gzCss', function () {
    return gulp.src(paths.minCss)
        .pipe(gzip())
        .pipe(gulp.dest(paths.concatGzCssDest));
});

//Step 7: Execute Gzip
gulp.task("gzip", gulp.series(["gzip:gzCss", "gzip:gzJs"]));

// A 'default' task is required by Gulp v4
gulp.task("default", gulp.series(["gzip"]));