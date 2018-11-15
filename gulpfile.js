var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify'); //混淆库
const htmlmin = require('gulp-htmlmin'); //html压缩
const cache = require('gulp-cached'); //用于复制文件时只复制修改过的
var concat = require('gulp-concat'); //合并Js

const rev = require('gulp-rev'), //生成文件hash
    revCollector = require('gulp-rev-collector'), //原始路径替换成hash地址
    fileInclude = require('gulp-file-include'); //界面模板功能

const postcss = require('gulp-postcss'), //css兼容适配
    autoprefixer = require('autoprefixer'); //css补前缀

var connect = require('gulp-connect'); //测试环境

var del = require('del'); //删除文件



// //测试环境
gulp.task('server', gulp.parallel(function () {
    return connect.server({
        root: 'dist/',
        // root: 'release/',
        host: '192.168.3.2',
        // livereload: true,
        port: 2333,
    });
}));


//postcss css 自助补全
gulp.task('postcss', gulp.series(function () {
    return gulp.src('./app/view_css/*.css')
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'], //http://www.ydcss.com/archives/94
            cascade: false, //是否美化属性值 默认：true 像这样：
        })]))
        .pipe(gulp.dest('dist/view_css/'));
}));

//模板处理
gulp.task('file-include', gulp.parallel(function () {
    return gulp.src(['./app/view/*.html']) //从app/view 目录
        .pipe(fileInclude({
            prefix: '@', //变量前缀 @include
            basepath: './dist/view_css/', //引用文件路径
            indent: true //保留文件的缩进
        }))
        .pipe(gulp.dest('./dist/view/')); //输出文件路径
}));

//复制图片
gulp.task('copy-img', gulp.parallel(function () {
    return del(['dist/res/*']).then(function () { //先删除
        return gulp.src('./app/res/*')
            .pipe(gulp.dest('./dist/res'));
    });
}));


//复制html=>目前只需要复制首页就可以了
gulp.task("copy-html", gulp.parallel(function () {
    // return gulp.src('app/**/*.html')
    return gulp.src('app/*.html')
        .pipe(cache('copy-html')) //只对修改的文件进行复制
        .pipe(gulp.dest("dist"));
}));


//定义看守任务
gulp.task('watch', gulp.parallel(function () {
    gulp.watch('app/*.html', gulp.parallel('copy-html')); //监听首页html
    gulp.watch(['app/*.ts', 'app/**/*.ts'], gulp.series('build-ts', "concat-js")); //监听ts
    gulp.watch('app/style/*.css', gulp.parallel('concat-css')); //监听css
    // gulp.watch('app/res/*', gulp.series('revImage', 'revHtmlCss', 'file-include'));//监听图片
    gulp.watch('app/res/*', gulp.series('copy-img')); //监听图片
    gulp.watch(['app/view_css/*.css', 'app/view/*.html'], gulp.series("postcss", "file-include")); //监听库修改
    // gulp.watch('libs/*.js', ['concat-js']);//监听库修改
}));

//编译ts
gulp.task("build-ts", gulp.parallel(function () {
    return browserify({
            // basedir: '.',
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
    return gulp.src(['libs/zepto.min.js', 'libs/fx.js','libs/Tween.min.js'])//, 'libs/*.js'
        .pipe(concat('library.js'))
        .pipe(gulp.dest("dist"));
}));

//合并css =>仅合并 style 目录下的
gulp.task("concat-css", gulp.parallel(function () {
    return gulp.src([
            'app/style/normalize.css',
            'app/style/common.css',
            'app/style/*.css'
        ])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/style'));
}));


gulp.task("default", gulp.series("build-ts", "postcss", gulp.parallel( // "revImage", "revHtmlCss"
    [
        "server",
        "concat-js",
        "copy-html",
        "watch",
        "concat-css",
        "file-include",
        "copy-img"
    ]), function () {
    console.log(23232)
}));
// gulp.task("default", gulp.series(),gulp.parallel(['concat-js']));

// 在上面代码开发中的时候，不执行版本管理，所以不做hash处理
//===================== 发布release  => 2018-11-14 16.50 上面dev版本有修改  下面release需要重新整理
// 这里要分步骤发布版本 先把所有的图片都生成hash名称 revImage   然后会生成对应的json文件  然后通过revHtmlCss这个方法替换所有的对应名称
// 然后再走正常的发布流程  gulp还不是特别熟悉，暂时多两步操作



//将所有的图片名称hash
gulp.task('revImage', gulp.series(function () { //=> 这两个功能在发布线上版本的时候再用，现在好像有问题
    // return del(['dist/res/*']).then(function () {//先删除
    return gulp.src('./app/res/*')
        .pipe(rev()) //文件名称生成hash
        .pipe(gulp.dest('./dist/res'))
        .pipe(rev.manifest()) //必须有这个方法=>生成对应的rev-manifest.json用来映射路径
        .pipe(gulp.dest('./dist/res'));
    // });
}));

//目前暂时所有的图片都写在css文件里面，所以这里只需要替换对应的css文件即可 => 这两个功能在发布线上版本的时候再用，现在好像有问题
gulp.task('revHtmlCss', gulp.series(function () {
    return gulp.src(['./dist/**/*.json', 'app/view_css/*.css'])
        .pipe(revCollector({
            replaceReved: true
        })) //rev-manifest.json 文件中的对应替换到css里
        .pipe(gulp.dest('dist/view_css/')); //输出到该文件夹中
}));

//压缩html
gulp.task('minHtml', gulp.parallel(function () {
    return gulp.src(['dist/**/*html', 'dist/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('release'));
}));

//混淆js => 这个方法暂时不要用，最好还是把原来的ts 编译以后再和库合并，然后再发布
gulp.task('minJs', gulp.parallel(function () {
    return gulp.src('./dist/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('release'));
}));

// gulp.task("concat-js", gulp.parallel(function () {
//     return gulp.src(['libs/zepto.min.js', 'libs/fx.js', 'libs/*.js', './dist/bundle.js'])
//         .pipe(concat('library.js'))
//         .pipe(gulp.dest("dist"));
// }));

//压缩css
gulp.task('minCss', gulp.parallel(function () {
    const postcss = require('gulp-postcss'), //css兼容适配
        autoprefixer = require('autoprefixer'),
        cssMin = require('gulp-minify-css'); //压缩
    return gulp.src('./dist/**/*.css')
        .pipe(postcss([autoprefixer()]))
        .pipe(cssMin())
        .pipe(gulp.dest('release'));
}));

//复制图片
gulp.task('copy-img-release', gulp.parallel(function () {
    return gulp.src('./dist/res/*')
        .pipe(gulp.dest('release/res'));
}));

gulp.task('release', gulp.parallel('minHtml', 'minJs', 'minCss', 'copy-img-release'));