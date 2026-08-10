# Calender Vue 重构项目 - 快速启动指南

## 项目概述

已成功将原始的 jQuery 日历项目重构为 Vue 3 + Vite 现代化应用，并添加了 MySQL 数据库认证功能。

## 已完成的工作

### ✅ 前端重构
1. **Vue 3 组件化架构** - 10个独立组件
2. **Day.js 替代 Moment.js** - 更轻量的日期处理
3. **移除所有内联脚本** - 完全组件化
4. **安全加固** - CSP头、HTTPS、输入验证
5. **可访问性改进** - ARIA标签、语义化HTML

### ✅ 后端服务
1. **Express.js API 服务器** - 端口3000
2. **MySQL 用户认证** - bcrypt加密
3. **Docker Compose 配置** - 一键启动MySQL
4. **自动数据库初始化** - 自动创建表和默认用户

### ✅ 优化改进
1. 消除重复代码
2. 移除硬编码数据
3. 添加表单验证
4. 防止SQL注入和XSS攻击

## 启动步骤

### 方法一：使用自动化脚本（推荐）

双击运行 `setup.bat`，它会自动完成所有设置。

### 方法二：手动启动

#### 第1步：复制资源文件

```powershell
# 复制图片
Copy-Item -Path "D:\aiproject\Calender\images" -Destination "D:\aiproject\calender-vue\public\images" -Recurse -Force

# 复制音频
Copy-Item -Path "D:\aiproject\Calender\media" -Destination "D:\aiproject\calender-vue\public\media" -Recurse -Force

# 复制CSS
Copy-Item -Path "D:\aiproject\Calender\css\style.css" -Destination "D:\aiproject\calender-vue\src\assets\style.css" -Force
Copy-Item -Path "D:\aiproject\Calender\css\clndr.css" -Destination "D:\aiproject\calender-vue\src\assets\clndr.css" -Force
Copy-Item -Path "D:\aiproject\Calender\css\audio.css" -Destination "D:\aiproject\calender-vue\src\assets\audio.css" -Force
Copy-Item -Path "D:\aiproject\Calender\css\easy-responsive-tabs.css" -Destination "D:\aiproject\calender-vue\src\assets\easy-responsive-tabs.css" -Force
```

#### 第2步：启动 MySQL（Docker）

```bash
cd D:\aiproject\calender-vue
docker-compose up -d
```

或者手动运行：
```bash
docker run -d --name calender-mysql -e MYSQL_ROOT_PASSWORD=calender_password_2026 -e MYSQL_DATABASE=calender_db -p 3306:3306 mysql:8.0
```

#### 第3步：配置数据库连接

编辑 `D:\aiproject\calender-vue\server\index.js`，确认数据库配置：

```javascript
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'calender_password_2026',  // 与docker-compose.yml中的密码一致
  database: 'calender_db'
};
```

#### 第4步：安装后端依赖并启动

```bash
cd D:\aiproject\calender-vue\server
npm install
npm start
```

后端启动后会显示：
```
Connected to MySQL database
Default user created: admin / admin123
Backend server running on http://localhost:3000
```

#### 第5步：启动前端

打开新终端：
```bash
cd D:\aiproject\calender-vue
npm run dev
```

前端将在 http://localhost:5173 启动。

## 测试登录

使用以下凭据测试登录功能：
- **用户名**: `admin`
- **密码**: `admin123`

## 项目文件清单

### 前端组件 (src/components/)
- ✅ Header.vue - 页面头部
- ✅ Calendar.vue - 日历组件（使用Day.js）
- ✅ AudioPlayer.vue - 音频播放器
- ✅ Weather.vue - 天气显示
- ✅ LoginForm.vue - 登录表单（MySQL认证）
- ✅ ContentMiddle.vue - 内容中部
- ✅ DownloadsChart.vue - 下载图表（Highcharts）
- ✅ SearchBox.vue - 搜索框
- ✅ TodoList.vue - 待办事项
- ✅ Footer.vue - 页脚

### 后端文件 (server/)
- ✅ index.js - Express服务器和API
- ✅ package.json - 后端依赖

### 配置文件
- ✅ docker-compose.yml - MySQL容器配置
- ✅ setup.bat - 自动化安装脚本
- ✅ README.md - 完整文档

## 技术对比

| 原始项目 | 重构后 |
|---------|--------|
| jQuery | Vue 3 |
| Moment.js | Day.js |
| Underscore.js | 原生JS |
| 内联脚本 | 组件化 |
| 硬编码数据 | 动态数据源 |
| 无认证 | MySQL + bcrypt |
| HTTP资源 | HTTPS + CSP |
| 无验证 | 完整表单验证 |

## 常见问题

### Q: MySQL 连接失败？
A: 确保 Docker Desktop 正在运行，执行 `docker-compose up -d`

### Q: 登录失败？
A: 确保后端服务已启动（http://localhost:3000），检查控制台错误信息

### Q: 样式不显示？
A: 确保已复制所有CSS文件到 src/assets/ 目录

### Q: 图片不显示？
A: 确保已复制 images 文件夹到 public/ 目录

## 下一步建议

1. 配置 OpenWeatherMap API Key 获取真实天气数据
2. 添加更多用户注册功能
3. 实现待办事项的持久化存储
4. 添加单元测试
5. 配置生产环境部署

## 联系与支持

如有问题，请查看 README.md 获取详细文档。