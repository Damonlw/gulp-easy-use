# Gulp

```
在有node环境下：
npm install gulp -g // 先全局安装
npm install gulp -S //再到指定目录下安装，这是个坑，全局和本地都得装
npm install
```

**gulp实用插件**

- 编译 Sass：gulp-sass
- 编译 Less：gulp-less
- 合并文件：gulp-concat
- 压缩js 文件：gulp-uglify
- 重命名js文件：gulp-rename
- 优化图像大小：gulp-imagemin
- 压缩css 文件：gulp-minify-css
- 创建本地服务器：gulp-connect
- 实时预览：gulp-connect
- 按指定顺序执行：run-sequence
- 浏览器兼容前缀：gulp-autoprefixer

**gulp API**

​     在Gulp中，使用的是Nodejs中的stream(流)，首先获取到需要的stream，通过stream的pipe()方法把流导入到你想要的地方，比如Gulp的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。

```
gulp.src() // 获取文件流
gulp.dest() // 生成文件路径
gulp.task(name,[, deps], function(){}) // 定义任务
name 是任务名，deps是任务依赖组，表示当前定义的任务会在所有的依赖执行完毕后才执行
如果依赖是一个异步操作，不会等待所依赖的异步任务完成，直接执行当前后续任务
如果需要等待异步执行完成再执行后续的任务
 gulp.task('sync',function(done){ //done是任务函数的回调，用来通知任务已经完成
  setTimeout(function(){
    console.log('done');
    done();  //执行回调，表示这个异步任务已经完成
  },5000);
});
gulp.watch(glob,function(){}) // 监视文件的变化，当文件变化后，执行相应的任务
```