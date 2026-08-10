# Calender Vue 重构版

基于 Vue 3 + Vite 重构的日历应用，使用现代化技术栈替代原有的 jQuery 实现。

## 技术栈

### 前端
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Day.js** - 轻量级日期处理库（替代 Moment.js）
- **Chart.js** - 图表库
- **Highcharts** - 交互式图表
- **Axios** - HTTP 客户端

### 后端
- **Express.js** - Node.js Web 框架
- **MySQL** - 关系型数据库（通过 Docker 运行）
- **bcryptjs** - 密码加密

## 优化改进

### 1. 技术栈升级
- ✅ 移除 jQuery，使用 Vue 3 响应式系统
- ✅ 移除 Moment.js，使用 Day.js（更轻量）
- ✅ 移除 Underscore.js，使用原生 JavaScript
- ✅ 使用 ES6+ 模块化语法

### 2. 代码质量提升
- ✅ 消除所有内联脚本，组件化开发
- ✅ 消除重复代码，使用可复用组件
- ✅ 移除硬编码数据，使用动态数据源
- ✅ 添加表单验证和安全防护

### 3. 安全加固
- ✅ 使用 HTTPS 加载外部资源
- ✅ 添加 CSP (Content Security Policy) 头
- ✅ 密码使用 bcrypt 加密存储
- ✅ 添加输入验证和 XSS 防护
- ✅ 防止 SQL 注入（使用参数化查询）

### 4. 性能优化
- ✅ 使用 Vite 快速热更新
- ✅ 异步加载脚本
- ✅ 组件懒加载
- ✅ 添加缓存策略配置

### 5. 可访问性改进
- ✅ 添加 ARIA 标签
- ✅ 完善 alt 文本
- ✅ 键盘导航支持
- ✅ 语义化 HTML

## 快速开始

### 前置要求
- Node.js 16+
- Docker Desktop（用于运行 MySQL）

### 1. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server
npm install
cd ..
```

### 2. 启动 MySQL（Docker）

```bash
docker run -d \
  --name calender-mysql \
  -e MYSQL_ROOT_PASSWORD=your_mysql_password \
  -e MYSQL_DATABASE=calender_db \
  -p 3306:3306 \
  mysql:8.0
```

### 3. 配置数据库连接

编辑 `server/index.js`，修改数据库配置：

```javascript
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your_mysql_password',  // 修改为你的 MySQL 密码
  database: 'calender_db'
};
```

### 4. 启动后端服务

```bash
cd server
npm start
```

后端服务将在 http://localhost:3000 启动，并自动创建用户表和默认管理员账户：
- 用户名：`admin`
- 密码：`admin123`

### 5. 启动前端开发服务器

```bash
npm run dev
```

前端应用将在 http://localhost:5173 启动。

## 项目结构

```
calender-vue/
├── public/              # 静态资源
│   ├── images/         # 图片文件
│   └── media/          # 音频文件
├── src/
│   ├── assets/         # CSS 样式文件
│   ├── components/     # Vue 组件
│   │   ├── Header.vue
│   │   ├── Calendar.vue
│   │   ├── AudioPlayer.vue
│   │   ├── Weather.vue
│   │   ├── LoginForm.vue
│   │   ├── ContentMiddle.vue
│   │   ├── DownloadsChart.vue
│   │   ├── SearchBox.vue
│   │   ├── TodoList.vue
│   │   └── Footer.vue
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── server/             # 后端服务
│   ├── index.js        # Express 服务器
│   └── package.json
├── index.html
├── vite.config.js
└── package.json
```

## 功能模块

### 1. 日历模块
- 使用 Day.js 处理日期
- 支持月份切换（按钮和键盘导航）
- 显示多日事件
- 高亮显示今天

### 2. 音频播放器
- 支持播放列表切换
- 上一首/下一首功能
- 收藏夹功能
- 使用原生 HTML5 Audio API

### 3. 数据可视化
- Chart.js 甜甜圈图
- Highcharts 折线图
- 响应式图表

### 4. 登录认证
- MySQL 数据库验证
- bcrypt 密码加密
- 记住密码功能
- 表单验证

### 5. 天气显示
- 当前日期显示
- 支持接入 OpenWeatherMap API（需配置 API Key）

### 6. 待办事项
- 复选框列表
- 响应式状态管理

## 构建部署

### 开发环境
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## API 文档

### 登录接口

**POST** `/api/auth/login`

请求体：
```json
{
  "username": "admin",
  "password": "admin123"
}
```

响应：
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

### 健康检查

**GET** `/api/health`

响应：
```json
{
  "status": "ok",
  "timestamp": "2026-08-07T12:00:00.000Z"
}
```

## 注意事项

1. **MySQL 配置**：确保 Docker 中的 MySQL 正在运行，并且密码配置正确
2. **天气 API**：如需真实天气数据，需在 `Weather.vue` 中配置 OpenWeatherMap API Key
3. **端口占用**：前端使用 5173 端口，后端使用 3000 端口，确保端口未被占用
4. **CORS**：后端已配置 CORS，允许前端跨域访问

## 默认账户

- 用户名：`admin`
- 密码：`admin123`

## 许可证

基于 W3Layouts 的 Superminimal UI Kit 模板重构，遵循 Creative Commons Attribution 3.0 许可证。