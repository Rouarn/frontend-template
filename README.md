# Frontend Template

基于 Vue 3 + Vite+ + TypeScript 构建的前端开发模板，内置路由自动生成、权限管理、国际化、主题切换等工程化能力。

> **内部项目说明**：本模板依赖团队私有包 `@vakao/axios`（运行时）与 `@vakao/scripts-utils`（脚本），需配置团队 npm 源访问权限后方可安装；CI 需提供具备只读权限的 `NPM_TOKEN`。仅限团队内部使用，未对外发布许可。

## 技术栈

| 分类 | 技术                          | 说明                          |
| ---- | ----------------------------- | ----------------------------- |
| 框架 | Vue 3.5 + TypeScript 7        | Composition API，完整类型安全 |
| 构建 | Vite+ 1.1（vp 单工具链）      | 极速 HMR，集成 Oxlint + Oxfmt |
| UI   | Naive UI 2 + UnoCSS           | 组件库 + 原子化 CSS           |
| 路由 | Elegant Router + Vue Router 5 | 文件系统路由自动生成          |
| 状态 | Pinia 4                       | 轻量级状态管理                |
| HTTP | @vakao/axios（团队私有）      | 团队封装的 Axios 客户端       |
| i18n | Vue I18n 11                   | 多语言支持                    |
| 工具 | VueUse、Day.js、Iconify       | 常用工具库                    |
| 规范 | vp（Oxlint + Oxfmt + hooks）  | lint / 格式化 / 提交检查一体  |

## 快速开始

```bash
git clone https://github.com/Rouarn/frontend-template.git
cd frontend-template

# 前提：已配置团队 npm 源（私有依赖 @vakao/axios 需要）
pnpm install

# 环境文件不入库，首次需从示例复制（按需修改）
cp .env.example .env
cp .env.development.example .env.development
cp .env.production.example .env.production

pnpm dev
```

启动后访问 `http://localhost:5173`，接口默认代理到本地后端 `http://127.0.0.1:8848`。

### 常用命令

| 命令             | 说明                                         |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | 启动开发服务器                               |
| `pnpm dev:prod`  | 生产模式开发                                 |
| `pnpm build`     | 构建生产版本                                 |
| `pnpm build:dev` | 构建开发模式版本                             |
| `pnpm preview`   | 预览构建结果                                 |
| `pnpm check`     | Oxfmt + Oxlint + 类型检查（lint/类型卡口）   |
| `pnpm lint`      | Oxlint 检查                                  |
| `pnpm fmt`       | Oxfmt 格式化                                 |
| `pnpm new:page`  | 页面脚手架（创建页面 + 语言包键 + 生成路由） |
| `pnpm gen:api`   | 从后端 OpenAPI 文档生成类型（需后端启动）    |
| `pnpm commit`    | 规范化提交（Commitizen + cz-git）            |

> 说明：lint、格式化、暂存区检查统一由 Vite+ 的 `vp` 命令承担，配置收拢在 [vite.config.ts](vite.config.ts) 的 `fmt` / `lint` / `staged` 配置块；git hooks 由 `vp config`（`pnpm install` 时自动执行）写入 `.vite-hooks/`。

## 项目结构

```
src/
├── components/          # 公共组件（common 通用 / custom 业务）
├── constants/           # 常量定义（store ID、路由鉴权策略等）
├── directives/          # 自定义指令（16 个）
├── hooks/               # 组合式函数（icon / router / state）
├── layouts/             # 布局组件
│   ├── base/            # 基础布局（含顶部菜单、侧边栏）
│   ├── blank/           # 空白布局（登录页、错误页等）
│   └── modules/         # 布局子模块（header / menu / content / tab）
├── locales/             # 国际化配置与语言包
├── plugins/             # 插件配置（Naive UI、指令注册等）
├── router/
│   ├── _generated/      # elegant-router 自动生成的路由文件（需提交 git）
│   └── guard/           # 路由守卫
├── service/             # API 服务层
│   ├── api/             # 接口定义
│   └── request/         # HTTP 客户端封装
├── stores/              # Pinia 状态管理
│   ├── modules/         # 业务 store（app / auth / route / theme / token / user）
│   └── plugins/         # Pinia 插件（setup store 重置）
├── styles/              # 全局样式
├── theme/               # 主题配置（Naive UI 主题覆盖）
├── typings/             # 类型定义
├── utils/               # 工具函数
└── views/               # 页面组件
    ├── (builtin)/       # 内置页面（login / 403 / 404 / 500 / iframe）
    ├── home/            # 首页
    ├── about/           # 关于页
    ├── demos/           # 示例分组
    ├── directives/      # 指令演示分组（16 个子页面）
    └── user-center/     # 用户中心
```

## 路由系统

### 工作原理

路由由 [Elegant Router](https://github.com/soybeanjs/elegant-router) 在构建期自动生成，无需手写路由配置：

1. **文件即路由** — `src/views/` 下的 `.vue` 文件按目录结构自动生成路由
2. **构建期生成** — 路由表、类型声明、组件懒加载全部在 `src/router/_generated/` 下自动产出
3. **白盒 meta** — 生成后可在 `routes.ts` 中手改 `meta`（i18nKey、order、isAuth 等），重新生成只补缺失属性，不覆盖手改

### 路由约定

| 约定                                 | 说明               | 示例                  |
| ------------------------------------ | ------------------ | --------------------- |
| `views/home/index.vue`               | 单段路径路由       | `/home`               |
| `views/demos/loading-demo/index.vue` | 多段路径路由       | `/demos/loading-demo` |
| `views/(builtin)/login/index.vue`    | 分组括号不影响路径 | `/login`              |
| `views/(builtin)/iframe/[url].vue`   | 动态参数路由       | `/iframe/:url`        |

### 布局分配

- `(builtin)` 分组下的页面和 `NotFound` 使用 `blank` 布局（无顶部菜单）
- 其余页面默认使用 `base` 布局
- 规则在 [er.config.ts](er.config.ts) 的 `getRouteLayout` 中配置

### 权限模型

前端全量静态路由 + 权限码过滤：

- 路由全部在构建期注册，不依赖后端下发
- 登录后调用 `fetchGetUserPermissions()` 获取可访问的路由名列表（返回数组，不要包 `{ data, error }`）
- 守卫对 `meta.isAuth === true` 的路由校验权限码，未命中则重定向到 `/403`
- 菜单按权限码过滤后显示
- 当前仍是本地 mock（返回全部路由名），对接后端时改写 [service/api/route.ts](src/service/api/route.ts)
- 后端 `User` 响应已带回 `role`（`admin` / `user`），前端存于 `userInfo.role`

### 角色控制

在路由 meta 上声明 `roles` 即可按角色限制菜单与访问：

```ts
// src/router/_generated/routes.ts（生成后手改）
meta: {
  isAuth: true,
  roles: ['admin'],
}
```

- 未声明 `roles`：不限制角色
- 菜单按角色过滤；直接访问不匹配的路由会被守卫重定向到 `/403`
- 仅影响前端展示与路由，接口权限仍由后端 `@Roles()` 强制校验

### 鉴权策略

通过 `src/constants/router.ts` 的 `DEFAULT_ROUTE_AUTH_REQUIRED` 控制项目级默认策略：

- **前台项目**（当前）：`false` — 多数页面公开，仅个人中心等显式 `meta.isAuth = true`
- **后台项目**：`true` — 多数页面需登录，仅 login/404 等显式 `meta.isAuth = false`

### 添加新页面

**单菜单（顶级）**：

1. 创建 `src/views/profile/index.vue`，添加 `defineOptions({ name: 'Profile' })`
2. 运行 `npx er generate`
3. 在生成的 `routes.ts` 中补 meta（i18nKey、order、isAuth 等）
4. 在语言包中添加 i18n 键

**菜单组**：

1. 创建 `src/views/settings/users/index.vue` 和 `src/views/settings/roles/index.vue`
2. 运行 `er generate`，补 meta
3. 在语言包中添加分组键：

```ts
// zh-cn.ts
settings: {
  title: '系统设置',        // 分组标题，键名约定 route.{segment}.title
  users: '用户管理',
  roles: '角色管理',
}
```

分组标题的 i18n 键自动推导为 `route.{路径首段}.title`，分组排序取首个子菜单的 order。无需改动其他文件。

## 功能特性

### 主题系统

- 支持浅色/深色模式切换
- 基于 Naive UI 主题覆盖 + CSS 变量
- 主色 `#059669`，圆角/阴影/间距均有统一规范

### 国际化

- 语言包位于 `src/locales/langs/`，支持 zh-cn / en-us
- 菜单文案通过 `$t` 响应式求值，语言切换自动更新
- 数据数组（如表单 rules）使用 `computed` 确保语言切换时更新

### 自定义指令

16 个实用指令，位于 `src/directives/`：

`v-animate` `v-clickoutside` `v-copy` `v-debounce` `v-drag` `v-focus` `v-highlight` `v-lazy` `v-loading` `v-longpress` `v-mask` `v-ripple` `v-scroll` `v-throttle` `v-tooltip` `v-watermark`

### HTTP Loading

全局加载动画组件，通过 `window.$loading` 调用：

```ts
window.$loading?.open()
window.$loading?.close()
window.$loading?.setText('处理中...')
```

内置智能计数机制，支持并发请求管理，已在 Axios 拦截器中集成。

### 状态管理

Pinia setup store，Store ID 统一维护在 [constants/store.ts](src/constants/store.ts)：

| Store | 职责                                            |
| ----- | ----------------------------------------------- |
| app   | 副标题、主题、语言、设备类型                    |
| auth  | 登录/登出编排（Facade 模式，委托 token + user） |
| token | 令牌存储（sessionStorage，关闭标签页即失效）    |
| user  | 用户信息                                        |
| route | 权限码、菜单派生、缓存名单                      |
| theme | 主题方案、配色                                  |

### 令牌传输方式

固定使用 `Authorization: Bearer` + `sessionStorage`，**不采用 HttpOnly Cookie 方案**：
Cookie 需要 CSRF 防护、严格同站/跨域配置，会明显增加与其他项目、移动端联调的成本。
代价是令牌可被 XSS 读取，因此请配合 CSP、少用 `v-html`、及时升级依赖来降低 XSS 面。

## 配置说明

### 环境变量

真实 `.env*` 已被 git 忽略，仓库只保留 `*.example`。每个键的用途、是否必填、默认值、示例与取值来源都写在示例文件里，改配置时以它们为准，不在 README 另维护一份清单：

- `.env.example` — 所有模式共用：标题、基础路径、开发端口、代理开关、sourcemap、存储前缀、图标前缀等
- `.env.development.example` — 开发环境：环境标识、路由模式、接口地址与代理映射表
- `.env.production.example` — 生产环境：环境标识、路由模式、线上接口地址

启动期只强制校验 `VITE_APP_TITLE`、`VITE_BASE_URL`、`VITE_SERVICE_BASE_URL` 三项（见 [build/config/env.ts](build/config/env.ts)），缺失直接报错；其余键留空即走默认值。所有 `VITE_` 前缀的键都会内联进浏览器产物，不能放密钥。

### Elegant Router 配置

根目录 [er.config.ts](er.config.ts) 配置路由生成行为：

- `rootRedirect` — 根路由重定向目标
- `notFoundRouteComponent` — 404 组件
- `generateBuiltinRoutes` — 是否将 Root/NotFound 纳入 routes.ts
- `getRouteLayout` — 按文件路径决定布局
- `getRouteMeta` — 生成基础 meta（完整 meta 在 routes.ts 手改）

## 常见问题

### 修改 meta 后重新生成会覆盖吗？

不会。`er generate` 只补缺失属性，手改的 meta 值会保留。

### 组件 name 为什么必须和路由名一致？

KeepAlive 的 `include` 按路由名匹配，组件 `defineOptions({ name })` 必须与路由 name 一致才能正确缓存。

### 如何关闭某页面的菜单显示？

在路由 meta 中添加 `hideInMenu: true`。

### 如何让某页面不需要登录？

在路由 meta 中添加 `isAuth: false`（覆盖项目默认策略 `DEFAULT_ROUTE_AUTH_REQUIRED`）。

### 生成的路由文件需要提交 git 吗？

需要。`src/router/_generated/` 下的文件包含手改的 meta，必须提交。文件头部已自带 lint ignore。

### 移除某个功能时要注意什么？

功能代码与对应演示页目录需一并删除（包括 `views/` 下的演示目录与语言包文案），避免残留空目录或死键。

## 参与贡献

1. 创建特性分支 (`git checkout -b feature/xxx`)
2. 提交更改（`pnpm commit` 使用规范化提交，commit-msg 钩子会校验格式）
3. 推送并开启 Pull Request

## 许可

仅限团队内部使用（UNLICENSED），未授予外部使用、修改或分发权利。

## 作者

**Rouarn** — <woyuxiaji@foxmail.com> · [GitHub](https://github.com/Rouarn) · [shixian.xyz](http://www.shixian.xyz)
