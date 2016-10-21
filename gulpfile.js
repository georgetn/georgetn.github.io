// Include gulp
var gulp = require('gulp');
	browserSync = require('browser-sync').create();
	reload = browserSync.reload;
// Include plugins
var cp = require('child_process');

// Include messages
var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

//Build Jekyll Site
gulp.task('jekyll-build', function (done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('jekyll', ['build'])
		.on('close', done);
});

//Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

// Jekyll-build first, then launch server
// Static server
gulp.task('browser-sync',['jekyll-build'], function() {
    browserSync.init({
        server: {
            baseDir: "_site"
        }
    });
});

// Watch all files then rebuild site
gulp.task('watch', function () {
	gulp.watch(['**/*.*', '!_site/**/*', '!node_modules/**/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
