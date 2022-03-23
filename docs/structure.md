# File Structure

This structure help you get familiar with projects quickly.

```
.
├── app.config.ts                 # 主程序配置，数据库、程序、第三方，一切可配置项
├── app.controller.ts             # 主程序根控制器
├── app.module.ts                 # 主程序根模块，负责各业务模块的聚合
├── common                        # 存放中间件
│   ├── adapters                  # 适配器的配置
│   ├── decorator                 # 业务装饰器
│   ├── exceptions                # 自定义异常
│   ├── filters                   # 异常处理器
│   ├── guard                     # 守卫与鉴权
│   ├── interceptors              # 拦截器, 数据过滤与响应格式化处理
│   ├── middlewares               # 中间件
│   └── pipes                     # 管道
├── constants                     # 常量
├── main.ts                       # 引入配置，启动主程序，引入各种全局服务
├── modules                       # 业务逻辑模块
├── processors                      # 核心辅助模块
│   ├── cache                       # Redis 缓存相关
│   ├── database                    # Mongo 数据库相关
│   ├── gateway                     # Socket.IO 相关
│   ├── helper                      # 辅助类
│   └── logger                      # 自定义 Logger
├── shared                          # 通用模型
│   ├── dto                         # 数据验证模型
│   ├── interface                   # 接口
│   └── model                       # 基本数据模型
├── utils                           # 工具类
├── bootstrap.ts                    # 引导程序
└── main.ts                         # 入口

```
