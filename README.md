# Nest-Server-Tools

🦁 帮助 nest-server 开发者在 vscode 中快速创建模板/目录/文件

## Architecture

[* 架构图](https://github.com/sophons-space/nest-server/blob/master/public/doc/architecture.md#%E6%9E%B6%E6%9E%84%E5%9B%BE)

## Features

1. 右键单击当前项目中的目录后，就可以看到对应的菜单选项

| `navigation` |
| --------------------------------|
| 🏗  Nest-S: New Module              |
| 🏗  Nest-S: New Extend              |

| `modification` |
| ------------------------------- |
| 📁  Nest-S: Shared                  |
| 📁  Nest-S: Common                  |
| 📄  Nest-S: module                  |
| 📄  Nest-S: sequelize               |

| `commands` |
| --------------------------------|
| 📦  Nest-S: BO                      |
| 📦  Nest-S: Decorator               |
| 📦  Nest-S: DTO                     |
| 📦  Nest-S: Controller              |
| 📦  Nest-S: Filter                  |
| 📦  Nest-S: Guard                   |
| 📦  Nest-S: Interceptor             |
| 📦  Nest-S: Pipe                    |
| 📦  Nest-S: Provider                |
| 📦  Nest-S: Service                 |

2. 点击指定功能，将弹出输入框，输入文本后会创建对应的模块/目录/文件

> 输入名称时，多个单词用 `-` 拼接

创建对应文件/目录时

- 驼峰命名，文件将自动转换为横线：`userName` --> `user-name`
- 横线命名，文件将遵循同样字符： `user-name` --> `user-name`

创建类/接口时

- 驼峰命名，类/接口将自动转换为首字母大写的驼峰：`userName` --> `UserName`
- 横线命名，类/接口将自动转换为首字母大写的驼峰：`user-name` --> `UserName`

## Common

> 请将使用 Nest-Server 创建的项目放置于独立的 vscode 工作区，确保您有最好的开发体验 ☺️

- 在 src - modules 下点击右键唤出菜单，可以看到 `🏗  Nest-S: New Module` 用于创建整个通用业务模块
- 在 src - extends 下点击右键唤出菜单，可以看到 `🏗  Nest-S: New Extend` 用于创建整个通用拓展模块
- 在 src - modules 的模块中点击右键唤出菜单，可以看到：
  - `📁  Nest-S: Shared` 用于创建公共资源目录
  - `📁  Nest-S: Common` 用于创建公共约定目录
  - `📄  Nest-S: module` 用于创建模块注册表
  - `📦  Nest-S: BO`     用于创建 BO    
  - `📦  Nest-S: Decorator` 用于创建 Decorator
  - `📦  Nest-S: DTO`        用于创建 DTO
  - `📦  Nest-S: Controller` 用于创建 Controller
  - `📦  Nest-S: Filter` 用于创建 Filter
  - `📦  Nest-S: Guard` 用于创建 Guard
  - `📦  Nest-S: Interceptor` 用于创建 Interceptor
  - `📦  Nest-S: Pipe` 用于创建 Pipe    
  - `📦  Nest-S: Provider` 用于创建 Provider
  - `📦  Nest-S: Service` 用于创建 Service 
- 在 src - extends 的模块中点击右键唤出菜单，可以看到：
  - `📁  Nest-S: Shared` 用于创建公共资源目录
  - `📁  Nest-S: Common` 用于创建公共约定目录
  - `📄  Nest-S: module` 用于创建模块注册表
  - `📦  Nest-S: Provider` 用于创建 Provider
- 在 src - extends - sequelize - shared 目录中点击右键唤出菜单，可以看到：`📄  Nest-S: sequelize` 用于创建 sequelize model 模板

## License

MIT