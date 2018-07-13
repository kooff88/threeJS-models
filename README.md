# H5 基础框架

## 环境

react 开发需要 [node](https://www.runoob.com/nodejs/nodejs-install-setup.html) 环境

## 快速上手

开发模式:  
```sh
1. 进入到项目根目录下 
  终端输入: npm install 

2. 终端输入: npm start  
  打开浏览器 访问 127.0.0.1:3001  ||   localhost:3001 访问终端.
```

生产模式：  
```sh
1. 进入到项目根目录下
   终端输入: npm run build 

2. 将生成的dist文件夹内打包好的项目 拷贝到 生产线发布 

```

结构: 
```
react-demo
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .babelrc
├── config
│   └── webpack.base.js
│   └── webpack.dev.js
│   └── webpack.prod.js
├── public
│   └── favicon.ico
│   └── index.html
└── src
    └── main.less
    └── main.jsx
    └── Loading.js
    └── Router.jsx
    └──  action
        └── ...
    └── component
        └── ...
    └──  module
        └── ...
    └──  reducer
        └── ...
    └──  static
        └── ...
    └──  styles
        └── ...
    └──  util
        └── ...
```
