<font color=#4E5969>JavaScript基础</font>
# ajax原理

>它是一种异步通信的方法，通过直接由 js 脚本向服务器发起 http 通信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法。  
1.创建 XMLHttpRequest 对象，也就是创建一个异步调用对象  
2.创建一个新的 HTTP 请求，并指定该 HTTP 请求的方法、URL 及验证信息  
3.设置响应 HTTP 请求状态变化的函数  
4.发送 HTTP 请求  
5.获取异步调用返回的数据  
6.使用 JavaScript 和 DOM 实现局部刷新  