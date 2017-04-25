var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    //watch files
    var files = [
    './style.css',
    './js/*.js',
    './*.php'
    ];

    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "localhost/umai/dcg/",
    notify: false
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('sass/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./'))
    .pipe(reload({stream:true}));
});

gulp.task('uglify', function() {
    gulp.src('js/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('min_js'));
});

gulp.task('imagemin', function() {
    gulp.src('img/**/*.{jpg,jpeg,png,gif}')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('img_optimize'));
});

// Default task to be run with `gulp`
gulp.task('default', ['uglify', 'imagemin', 'sass', 'browser-sync'], function () {
    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch('js/**/*.js', ['uglify']);
    gulp.watch('img/**/*.{jpg,jpeg,png,gif}', ['imagemin']);
});
