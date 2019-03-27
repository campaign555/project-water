var gulp = require('gulp');
// $ npm install gulp --save-dev

var less = require('gulp-less');
// $ npm install less --save-dev

var imgMin = require('gulp-imagemin');
// $ npm install gulp-imagemin --save-dev

var connect = require('gulp-connect');
// $ npm install gulp-connect --save-dev

var postCss = require('gulp-postcss');
// $ npm install gulp-postcss --save-dev
var autoPrefixer = require('autoprefixer');
// $ npm install autoprefixer --save-dev

var fileInclude = require('gulp-file-include');
// $ npm install gulp-file-include --save-dev


var folder = {
    src : 'src/',
    dist: 'dist/'
}

function html(){
    return gulp.src(folder.src + 'html/*')
            .pipe(connect.reload())
            .pipe(fileInclude({
                prefix:'@@',
                basepath:'@file'
            }))
            .pipe(gulp.dest(folder.dist + 'html/'))
}
function css(){
    return gulp
        .src(folder.src + 'css/*')
        .pipe(less())
        .pipe(connect.reload())
        .pipe(postCss([autoPrefixer()]))
        .pipe(gulp.dest(folder.dist + 'css/'))
}
function js(){
    return gulp.src(folder.src + 'js/*')
            .pipe(connect.reload())
            .pipe(gulp.dest(folder.dist + 'js/'))
}
function img(){
    return gulp.src(folder.src + 'images/*')
            .pipe(connect.reload())
            .pipe(imgMin())
            .pipe(gulp.dest(folder.dist + 'images/'))
}

function server(){
    connect.server({
        port:9999,
        livereload:true
    })
}
function watch(){
    gulp.watch(folder.src + 'html/*',gulp.series(html))
    gulp.watch(folder.src + 'css/*',gulp.series(css))
    gulp.watch(folder.src + 'js/*',gulp.series(js))
    gulp.watch(folder.src + 'images/*',gulp.series(img))
}


gulp.task('default',gulp.series(gulp.parallel(html,css,js,img,server,watch)))