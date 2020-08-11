var gulp = require('gulp');
var sass = require('gulp-sass');

const sassPromise = () => {
    return new Promise(
        gulp.task('sass', gulp.series( function() {
            return gulp.src(['node_modules/bootstrap/scss/*.scss', 'src/scss/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest('src/css'));
        })))
}

const watchPromise = () => {
    return new Promise(
            gulp.task('watch', gulp.series( function() {
            gulp.watch(['node_modules/bootstrap/scss/*.scss', 'src/scss/*.scss']);
        })))
}

async function watchAndCompile(promise1, promise2){
    await promise1()
    await promise2()
    gulp.task('default', gulp.series( ['sass', 'watch'] ));
}

watchAndCompile(sassPromise, watchPromise)
