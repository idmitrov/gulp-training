(() => {
	const cfg = require('./config');
	const gulp = require('gulp');

	const historyApiFallback = require('connect-history-api-fallback');
	const browserSync = require('browser-sync').create();
	const plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/
	});

	// CLEAN
	const clean = () => {
		return gulp.src(cfg.dist.index, { allowEmpty: true, read: false })
			.pipe(plugins.clean());
	}

	// HTML
	const html = () => {
		return gulp.src(`${cfg.src.index}/index.html`)
			.pipe(gulp.dest(cfg.dist.index))
	}

	//STYLES
	const styles = () => {
		return gulp.src(`${cfg.src.style}/main.styl`)
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.stylus())
			.pipe(plugins.sourcemaps.write('.'))
			.pipe(gulp.dest(cfg.dist.style))
			.pipe(browserSync.stream());
	}

	// SCRIPTS
	const scripts = () => {
		return gulp.src([`${cfg.src.script}/**/*_.js`, `${cfg.src.script}/**/*.js`])
			.pipe(plugins.babel())
			.pipe(plugins.sourcemaps.init())
			// .pipe(plugins.uglify())
			.pipe(plugins.concat('main.js'))
			.pipe(plugins.sourcemaps.write('.'))
			.pipe(gulp.dest(cfg.dist.script))
			.pipe(browserSync.stream());
	}

	// WATCH
	const watch = () => {
		browserSync.init({
			server: cfg.dist.index,
			middleware: [ historyApiFallback() ]
		});

		gulp.watch(`${cfg.src.style}/**/*.styl`, styles);
		gulp.watch(`${cfg.src.script}/**/*.js`, scripts);
	}

	gulp.task('default', gulp.series(clean, gulp.parallel(html, scripts, styles, watch)));
})();