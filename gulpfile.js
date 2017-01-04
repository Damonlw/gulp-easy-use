var gulp = require("gulp"),
    less = require('gulp-less'),  //编译less
    browserSync = require('browser-sync'),   // 热加载
    imagesmin = require('gulp-imagemin'),  //图片压缩
    sourcemaps = require('gulp-sourcemaps'),  //调试文件
    cache = require('gulp-cache'),  //缓存
    autoprefixer = require('gulp-autoprefixer'),  //自动加浏览器兼容前缀
    runSequence = require('run-sequence'),  // 按照一定顺序执行
    del = require('del'),  // 删除文件
    notify = require('gulp-notify'),  // 提示
    minifyHtml = require("gulp-minify-html"),   // 压缩html
    minify = require('gulp-minify-css'),   // 压缩css
    uglify = require('gulp-uglify')   // 压缩js

var config = {
    root:'./src',
    dist:"./dist/",
    dist_css:"./dist/css/",
    dist_images:'./dist/images/',
    dist_js:'./dist/js/',
    dist_html:'./dist/static/',
    src_less:'./src/less/',
    src_css:'./src/css/',
    src_images:'./src/images/',
    src_js:'./src/js/',
    src_html:'./src/'
};

//start browserSync server
gulp.task('browserSync',function(){
    browserSync({
        server:{
            baseDir:[config.root]
        }
    })
});



//压缩图片
gulp.task('images',function(){
    return gulp.src(config.src_images + "**.*")
        .pipe(imagesmin())
        .pipe(gulp.dest(config.dist_images))
});
//复制src目录下的static文件夹到dist目录下的static文件夹
gulp.task('html',function(){
   return gulp.src(config.src_html + "*.html")
       .pipe(minifyHtml())
       .pipe(gulp.dest(config.dist_html));
});
//复制src目录下的js文件夹到dist目录下的js文件夹
gulp.task('js',function(){
    return gulp.src(config.src_js + "**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest(config.dist_js))
});

//编译less文件
gulp.task('less',function(){
    // browserSync.notify("正在编译less");
    return gulp.src(config.src_less + "*.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer('last 10 versions','ie 8'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.src_css))
});
//复制css
gulp.task("css",function(){
    return gulp.src(config.src_css + "*.css")
        .pipe(minify())
        .pipe(gulp.dest(config.dist_css))
});

//清除生产文件
/*gulp.task('clean',function(){
 return del.sync('dist').then(function(cb){
 return cache.clearAll(cb);
 })
 });*/

gulp.task('clean:dist',function(){
   return del.sync(['dist/**/*','!dist/images']);
});

gulp.task('watch',function(){
    gulp.watch(config.src_less + "**/*.less",['less']);       //监听less变化
    gulp.watch(config.root + "*.html",browserSync.reload); //监听主目录文件夹下的html变化
    gulp.watch(config.src_html + "*.html",browserSync.reload); //监听src/static目录下的html变化
    gulp.watch(config.src_js + "*.js",browserSync.reload);    //监听src/js目录下的js变化
});

gulp.task('default',function(callback){
    runSequence(['less','browserSync','watch'],callback);        //默认的开发任务，包括编译css，自动刷新浏览器和监听任务
});
gulp.task('build',function(callback){
    runSequence('clean:dist',['css','images','js','html'],callback);  //默认的部署到生产环境的任务命令
});
