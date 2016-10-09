'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});



gulp.task('deploy', ['build'], function() {
    // create a new publisher

    var bucket = 'test.whatthefuck.space';
    console.log(bucket);
    var publisher = $.awspublish.create({
        params: {
            Bucket: bucket
        }
    });

    // define custom headers
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
    };

    return gulp.src('dist/**/*.*')
        // .pipe($.awspublish.gzip({
        //     ext: ''
        // }))
        .pipe(publisher.publish(headers))
        .pipe(publisher.sync())
        .pipe(publisher.cache())
        .pipe($.awspublish.reporter());
});
