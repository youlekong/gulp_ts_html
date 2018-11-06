// var gulp = require('gulp');
// var ts = require("gulp-typescript");
// var tsProject = ts.createProject("tsconfig.json");

// gulp.task("default", function () {
//     return tsProject.src()
//     .pipe(tsProject())
//     .js.pipe(gulp.dest('dist'));
// })

var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');//混淆库
const htmlmin = require('gulp-htmlmin');//html压缩
const cache = require('gulp-cached');//用于复制文件时只复制修改过的
var concat = require('gulp-concat');//合并Js



var connect = require('gulp-connect');//测试环境



var del = require('del');//删除文件


// //测试环境
gulp.task('webserver', gulp.parallel(function () {
    connect.server({
        // livereload: true,
        port: 2333,
    });
}));

//复制html
gulp.task("copy-html", gulp.parallel(function () {
    return gulp.src('app/**/*.html')
        .pipe(cache('copy-html'))//只对修改的文件进行复制
        .pipe(gulp.dest("dist"));
}));

//复制图片
gulp.task('copy-img', gulp.parallel(function () {
    del(['dist/res/*']).then(function () {//先删除
        gulp.src('app/res/*')
            // .pipe(cache("copy-img"))//只对修改的文件进行复制
            .pipe(gulp.dest('dist/res'));
    });
}));

//定义看守任务
gulp.task('watch', gulp.parallel(function () {
    gulp.watch('app/**/*.html', gulp.parallel('copy-html'));//监听html
    gulp.watch(['app/*.ts', 'app/**/*.ts'], gulp.series('build-ts', "concat-js"));//监听ts
    gulp.watch('app/style/*.css', gulp.parallel('concat-css'));//监听css
    gulp.watch('app/res/*', gulp.parallel('copy-img'));//监听图片
    // gulp.watch('libs/*.js', ['concat-js']);//监听库修改
}));

//编译ts
gulp.task("build-ts", gulp.parallel(function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['app/Main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}));

//合并js 
gulp.task("concat-js", gulp.parallel(function () {
    return gulp.src(['libs/*.js', 'dist/bundle.js'])
        .pipe(concat('bundle.dev.js'))
        .pipe(gulp.dest("dist"));
}));

//合并css
gulp.task("concat-css", gulp.parallel(function () {
    return gulp.src(['app/style/main.css', 'app/style/*.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/style'));
}));

//postcss css 自助补全
// gulp.task('css', gulp.parallel(function () {
//     const postcss = require('gulp-postcss');//css兼容适配
//     var autoprefixer = require('autoprefixer');

//     return gulp.src('app/style/*.css')
//     // return gulp.src('app/view/*.html')
//         .pipe(postcss([autoprefixer()]))
//         .pipe(concat('style.css'))
//         .pipe(gulp.dest('./dest'));
// }));

gulp.task("default", gulp.series("build-ts", gulp.parallel(
    [
        "webserver",
        "concat-js",
        "copy-html",
        "watch",
        "concat-css",
        "copy-img"
    ]), function () {
        console.log(23232)
    }));
// gulp.task("default", gulp.series(),gulp.parallel(['concat-js']));

//===================== 发布release

// //压缩html
// gulp.task('minify-html', () => {
//     return gulp.src('dist/**/*.html')
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest('release'));
// });

// //混淆代码
// gulp.task('release', ['minify-html'], function () {
//     return gulp.src('dist/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest("release/"));
// })
