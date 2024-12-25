const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const os = require('os');

// 创建 Express 应用
const app = express();

// 添加安全响应头的中间件
app.use((req, res, next) => {
  // 基础安全头
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header('Access-Control-Allow-Origin', '*');

  // 为 wasm 文件添加完整的响应头配置
  if (req.path.endsWith('.wasm')) {
    res.setHeader('Content-Type', 'application/wasm');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }


  next();
});

// 配置静态文件中间件，将 dist 目录作为静态资源目录
app.use(express.static(path.join(__dirname, 'pro')));

// 所有路由都返回 index.html，用于支持前端路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pro', 'index.html'));
});

// SSL 证书配置
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// 创建 HTTPS 服务器
const server = https.createServer(options, app);

// 获取本地 IP 地址的函数
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // 跳过内部 IP 和非 IPv4 地址
      if (interface.family === 'IPv4' && !interface.internal) {
        return interface.address;
      }
    }
  }
  return '127.0.0.1';
}

// 监听所有网络接口的 3000 端口
const PORT = 3000;
const localIP = getLocalIP();
server.listen(PORT, '0.0.0.0', () => {
  console.log(`你可以通过 https://${localIP}:${PORT}/ 访问`);
});
