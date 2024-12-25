# jessibuca-pro-wasm-multi-thread-demo
 jessibuca pro wasm multi thread demo (jb pro wasm 多线程demo)


# 重点

dist目录下的代码不是最新版本的，如需要测试，请自行更新到最新版本测试，

最新版本下载地址 [https://jessibuca.com/pro.zip](https://jessibuca.com/pro.zip) 替换 `dist` 目录即可

# 安装依赖

```bash
npm install
```

# 运行

```bash
npm run start
```

然后控制台会打印出来一个地址，访问即可

```
你可以通过 https://xxx.xxx.xxx.xxx:3000/ 访问
```


## 修改端口

在 `server.js` 中 第`63`行
```js

// 监听所有网络接口的 3000 端口
const PORT = 3000;
```

修改 `3000` 为你需要的端口即可
