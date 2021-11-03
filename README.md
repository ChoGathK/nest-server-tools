# Nest-Server-Tools

🦁 帮助 nest-server 开发者在 vscode 中快速创建模板/目录/文件

## Architecture

[* 整体介绍](https://github.com/ChoGathK/nest-server/blob/master/public/doc/architecture.md)

## Features

1. 右键单击当前项目中的目录后，就可以看到对应的菜单选项

| `navigation` |
| --------------------------------|
| 🏗  Nest: New Module              |
| 🏗  Nest: New Extend              |

| `modification` |
| ------------------------------- |
| 📁  Nest: Shared                  |
| 📁  Nest: Common                  |
| 📄  Nest: module                  |
| 📄  Nest: entity                  |

| `commands` |
| -------------------------------- |
| 📦  Nest: BO                      |
| 📦  Nest: DAO                     |
| 📦  Nest: DTO                     |
| 📦  Nest: Controller              |
| 📦  Nest: Manager                 |
| 📦  Nest: Provider                |
| 📦  Nest: Service                 |

2. 点击指定功能，将弹出输入框，输入文本后会创建对应的模块/目录/文件

> 输入名称时，多个单词用 `-` 拼接

创建对应文件/目录时

- 驼峰命名，文件将自动转换为横线：`userName` --> `user-name`
- 横线命名，文件将遵循同样字符： `user-name` --> `user-name`

创建类/接口时

- 驼峰命名，类/接口将自动转换为首字母大写的驼峰：`userName` --> `UserName`
- 横线命名，类/接口将自动转换为首字母大写的驼峰：`user-name` --> `UserName`

## Common

> 请将使用 Nesterver 创建的项目放置于独立的 vscode 工作区，确保您有最好的开发体验 ☺️

### 创建整个通用业务模块

- 在 src - modules 下点击右键唤出菜单，可以看到 `🏗  Nest: New Module` 用于创建整个通用业务模块

### 创建整个通用拓展模块

- 在 src - extends 下点击右键唤出菜单，可以看到 `🏗  Nest: New Extend` 用于创建整个通用拓展模块

### 在 业务模块 中增加功能

- 在 src - modules 的模块中点击右键唤出菜单，可以看到：
  - `📁  Nest: Shared` 用于创建公共资源目录
  - `📁  Nest: Common` 用于创建公共约定目录
  - `📄  Nest: module` 用于创建模块注册表
  - `📦  Nest: BO`     用于创建 BO
  - `📦  Nest: DTO`    用于创建 DTO
  - `📦  Nest: DAO`    用于创建 DAO
  - `📦  Nest: Controller` 用于创建 Controller
  - `📦  Nest: Service` 用于创建 Service 
  - `📦  Nest: Manager` 用于创建 Manager    
  - `📦  Nest: Provider` 用于创建 Provider

### 在 拓展模块 中增加功能

- 在 src - extends 的模块中点击右键唤出菜单，可以看到：
  - `📁  Nest: Shared` 用于创建公共资源目录
  - `📁  Nest: Common` 用于创建公共约定目录
  - `📄  Nest: module` 用于创建模块注册表
  - `📦  Nest: Provider` 用于创建 Provider

### 在 拓展模块 中增加 sequelize model

- 在 src - extends - sequelize - shared 目录中点击右键唤出菜单，可以看到：`📄  Nest: entity` 用于创建 sequelize model 模板

## License

MIT