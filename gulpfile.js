// ���� gulp
var gulp = require('gulp');

// �������
var jshint = require('gulp-jshint'),            // ���ű�
    sass = require('gulp-ruby-sass'),           // ����Sass
    minifycss = require('gulp-minify-css'),     // cssѹ��
    autoprefixer = require('gulp-autoprefixer'),// �Զ����css3ǰ׺
    concat = require('gulp-concat'),            // �ϲ�
    uglify = require('gulp-uglify'),            // jsѹ��
    clean = require('gulp-clean'),              // ����ļ���
    rename = require('gulp-rename');            // ������


// ���ű�
gulp.task('jshint', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

// ����Sass
gulp.task('sass', function () {
    var cssSrc = './src/scss/*.scss',
        cssDst = './dist/css';
    return sass(cssSrc, { style: 'expanded' })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});

// ѹ��js�ļ�
gulp.task('jsuglify', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// �ϲ�,ѹ��js�ļ�
gulp.task('jsconcat', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// �����ʽ��js
gulp.task('clean', function () {
    gulp.src(['./dist/css', './dist/js'], { read: false })
        .pipe(clean());
});

// Ĭ������
gulp.task('default', function () {
    gulp.run('jshint', 'sass', 'jsuglify');

    // �����ļ��仯
    var jsSrc = './src/js/*.js',
        cssSrc = './src/scss/*.scss';
    gulp.watch([jsSrc, cssSrc], function () {
        gulp.run('jshint', 'sass', 'jsuglify');
    });
});