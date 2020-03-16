var gulp = require("gulp");
var minifyHtml = require("gulp-minify-html");
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

var paths = {
  html: "src/*.html",
  scripts: "src/js/*.js",
  styles: "src/css/*.css"
}

gulp.task("minify-html", function() {
  gulp.src("src/*.html")
  .pipe(minifyHtml())
  .pipe(gulp.dest("./build"));
});

gulp.task("merge-minify-js", function() {
  gulp.src("src/js/*.js")
  .pipe(concat("main.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("build/js"));
});

gulp.task("merge-minify-css", function() {
  gulp.src("src/css/*.css")
  .pipe(concat("main.min.css"))
  .pipe(minifyCss())
  .pipe(gulp.dest("build/css"));
});

gulp.task("watch", function() {
  gulp.watch(paths.html, gulp.series("minify-html"));
  gulp.watch(paths.scripts, gulp.series("merge-minify-js"));
  gulp.watch(paths.styles, gulp.series("merge-minify-css"));

});

gulp.task("default", gulp.series("watch", "minify-html", "merge-minify-js", "merge-minify-css"));
