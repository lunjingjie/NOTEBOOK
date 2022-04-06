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
本质上，webpack loader将所有类型的文件，转换为应用程序的**依赖图**：可以直接应用的模块。