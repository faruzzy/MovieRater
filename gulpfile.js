const gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync').create(),
	sass = require('gulp-sass');

gulp.task('sass', () => {
	return gulp.src('src/scss/*.scss')
		//.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('src/css/'))
		.pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync.init({
		watchOptions: {
			ignoreInitial: true
		},
		files: ['src/'],
        server: 'src/'
    });
});

gulp.task('es6', () => {
    browserify('src/js/app.js')
        .transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('src/build/'));
});

gulp.task('default', ['serve', 'es6', 'sass'], () => {
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['es6']).on('change', browserSync.reload);
	gulp.watch('src/scss/*.scss', ['sass']);
});
