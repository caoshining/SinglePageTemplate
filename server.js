const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('index.html')
let app = express()


// var buildPath = "./__build__";
app.use(bundler.middleware());//设置静态文件目录
/* 代理服务器 */
// app.use('/', proxy({
//   target: "",
//   changeOrigin: true
// }));
// app.use(bundler.middleware())
// app.get('*', function (req, res) {
//   res.sendFile(bundler.middleware());
// });

app.listen(Number(process.env.PORT || 8888))
