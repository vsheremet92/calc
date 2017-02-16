var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
    gulp.src('core/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('core/dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'core'
        },
    })
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('core/styles/*.scss', ['sass']);
    gulp.watch('core/*.html', browserSync.reload);
    gulp.watch('core/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);
