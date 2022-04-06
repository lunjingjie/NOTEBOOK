 # webpack

 ## 1.Webpack中的Module是指什么？

 webpack支持ESModule、CommonJs、AMD、Assests(image,font,video,audio,json)

 1.ESModule

 关键字 export，允许将ESModule中内容暴露给其他模块.
 
 关键字 import

 ```js
 ```

 // package.json
 type: module -> ESM
 type: commonjs -> CommonJS

 2. CommonJS

 module.exports，允许将CommonJS中的内容暴露给其他模块

 require，允许将其他模块引入到模块当中


### 所以webpack modules，如何表达自己的各种依赖关系？

* ESM import 语句
* CommonJS require
* AMD define require
* CSS/sass/less @import

### 我们常说的chunk和bundle的区别是什么？（important!!!）

1.Chunk

Chunk是webpack打包过程中Modules的集合，是打包过程中的概念。

webpack的打包是从一个入口模块开始，入口模块引用其他模块，其他模块引用其他模块.......
webpack通过引用关系逐个打包模块，这些module就形成了一个chunk。

如果有多个入口模块，可能会产生多条打包路径，每条路径都会形成一个chunk。

2. Bundle

是我们最终输出的一个或者多个打包好的文件。

3. Chunk和Bundle的关系是什么？

大多数情况下，一个chunk会生产一个bundle，但是也有例外。
如果加了sourcemap，一个entry，一个chunk 对应 两个bundle。
Chunk是过程中代码块，bundle是打包结果输出的代码块。Chunk在构建完成就呈现为bundle。

4. Split Chunk

5. 这段配置会产生几个Chunk

### Plugin和Loader分别是做什么的？怎么工作的？
1. Loader
模块转换器，将非js模块转化为webpack能识别的js模块。
本质上，webpack loader将所有类型的文件，转换为应用程序的**依赖图**：可以直接引用的模块。

2. plugin
扩展插件，webpack运行的各个阶段，都会广播出对应的事件，插件去监听对应的事件。

3. Compiler
对象，包含了webpack环境的所有配置信息，包括options、plugins、loader.
webpack启动的时候实例化，他是全局唯一的，可以把他理解为webpack的实例。

4. Compilation
包含了当前的模块资源，编译生成资源。
webpack在开发模式下运行的时候，每当检测一个文件的变化，就会创建一次新的Compilation。

### 能简单描述一下webpack的打包过程吗？
1.初始化参数：shell webpack.config.js
2.开始编译：初始化一个Compiler对象，加载所有的配置，开始执行编译
3.确定入口：根据entry中的配置，找到所有的入口文件
4.编译模块：从入口文件开始，调用所有的loader，再去递归的找依赖
5.完成模块的编译：得到每个模块被翻译之后的最终内容以及他们之间的依赖关系
6.输出资源：根据得到的依赖关系，组装成一个个包含多个module的chunk
7.输出完成：根据配置，确定要输出的文件名以及文件路径
