# Amis 启动脚本修改

1. 安装依赖改成 yarn install, 不用npm
2. 启动脚本改成 rsbuild ,我的 M2 电脑3秒启动。
3. 修复其他启动遇到的问题。

# Amis 文档启动命令

其实 examples 应该在packages 里面做子项目，共享node_modules

这里就不调整文件夹结构了，方便以后同步官方仓库。

```
//进入目录
cd examples
//安装依赖

yarn 

//启动
yarn dev
```

# Editor 编辑器快速启动

```
yarn editor:dev
```

本地启动时候会报错 amis/schema.json 不存在

需要从官网手动下载复制到 packages/amis 文件夹下

https://github.com/baidu/amis/releases/download/6.12.0/schema.json