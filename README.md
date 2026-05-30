# TypeScript 学习教程

从零开始掌握 TypeScript 的完整学习项目。

## 项目结构

```
📁 Typescript_learning/
├── 📄 package.json          # 项目配置与依赖
├── 📄 tsconfig.json         # TypeScript 编译配置（含详细注释）
├── 📄 ts_demo1.ts           # 入门教程（10章：基础类型 → 工具类型）
├── 📄 ts_demo2.ts           # 进阶教程（9章：泛型进阶 → 实战练习）
├── 📄 .gitignore            # Git 忽略规则
└── 📁 dist/                 # 编译输出目录（npm run build 后生成）
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行教程

| 命令 | 说明 |
|------|------|
| `npm run dev` | 用 ts-node 直接运行入门教程 |
| `npm run dev:demo2` | 用 ts-node 直接运行进阶教程 |
| `npm run build` | 编译 TypeScript 到 dist/ 目录 |
| `npm start` | 编译后运行入门教程 |
| `npm run build:watch` | 监听模式，文件修改自动编译 |

### 3. 学习路线

```
ts_demo1.ts (入门)
  ├── 第一章：基础类型 (string, number, boolean, array, tuple, enum)
  ├── 第二章：类型推断
  ├── 第三章：接口 (Interface)
  ├── 第四章：类型别名 (Type Alias)
  ├── 第五章：联合类型与类型守卫
  ├── 第六章：函数
  ├── 第七章：类 (Classes)
  ├── 第八章：泛型 (Generics)
  ├── 第九章：实用工具类型 (Partial, Readonly, Pick, Omit, Record)
  └── 第十章：类型断言与缩小
        │
        ▼
ts_demo2.ts (进阶)
  ├── 第一章：高级类型操作 (交叉类型, keyof)
  ├── 第二章：泛型进阶 (泛型类, 泛型约束实战)
  ├── 第三章：条件类型与 infer
  ├── 第四章：模板字面量类型
  ├── 第五章：映射类型 (Mapped Types)
  ├── 第六章：类型守卫进阶 (is, asserts)
  ├── 第七章：函数组合模式
  ├── 第八章：Result 错误处理模式
  └── 第九章：实战 —— HTTP 客户端封装
```

## tsconfig.json 核心配置说明

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `target` | ES2022 | 编译目标 JS 版本 |
| `module` | commonjs | Node.js 模块系统 |
| `strict` | true | 开启所有严格类型检查 |
| `outDir` | ./dist | 编译输出目录 |
| `sourceMap` | true | 生成 source map 方便调试 |
| `noImplicitAny` | true | 禁止隐式 any 类型 |

## 常用 TypeScript 资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play) — 在线试验 TS 代码
- [TypeScript 发布日志](https://devblogs.microsoft.com/typescript/)

## License

MIT
