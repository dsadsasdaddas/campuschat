<div align="center">

# 💬 CampusChat

### AI-Powered Campus Communication Platform

**校园智能对话平台**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![Google AI](https://img.shields.io/badge/Google%20AI-Gemini-green.svg)](https://ai.google.dev/)

</div>

---

## 📖 简介 | Introduction

[中文](#中文) | [English](#english)

### English

CampusChat is an AI-powered campus communication platform built with React and Google Gemini AI. It provides intelligent chat capabilities for students and faculty.

### 中文

CampusChat 是一个基于 React 和 Google Gemini AI 构建的校园智能对话平台，为学生和教职工提供智能聊天功能。

---

## ✨ 功能特性 | Features

- 🤖 **AI 智能对话** - 基于 Google Gemini 的智能回复
- 💨 **快速响应** - Vite + React 19 构建的高性能应用
- 🎨 **现代 UI** - Tailwind CSS 设计的精美界面
- 💾 **本地存储** - SQLite 数据库支持
- 🌙 **暗色模式** - 支持明暗主题切换

---

## 🛠️ 技术栈 | Tech Stack

| Frontend | Backend | AI |
|----------|---------|-----|
| React 19 | Express.js | Google Gemini AI |
| TypeScript | SQLite | @google/genai |
| Vite | Node.js | |
| Tailwind CSS | | |

---

## 📦 快速开始 | Quick Start

### 前置要求 | Prerequisites

- Node.js 18+
- Google AI API Key

### 安装步骤 | Installation

```bash
# 1. 克隆仓库 | Clone repository
git clone https://github.com/dsadsasdaddas/campuschat.git
cd campuschat

# 2. 安装依赖 | Install dependencies
npm install

# 3. 配置 API Key | Configure API key
cp .env.example .env.local
# 编辑 .env.local，设置 GEMINI_API_KEY

# 4. 启动开发服务器 | Start dev server
npm run dev
```

### 访问应用 | Access Application

打开浏览器访问: http://localhost:3000

---

## 📁 项目结构 | Project Structure

```
campuschat/
├── src/
│   ├── components/      # React 组件
│   ├── hooks/           # React Hooks
│   ├── lib/             # 工具库
│   └── App.tsx          # 主应用
├── public/              # 静态资源
├── package.json
└── vite.config.ts
```

---

## 🔧 配置说明 | Configuration

### 环境变量 | Environment Variables

| 变量名 | 描述 | 必需 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini API 密钥 | ✅ |
| `APP_URL` | 应用部署 URL | ❌ |

---

## 📄 许可证 | License

MIT License

---

## 👤 作者 | Author

**王越 (Wang Yue)** - 温州大学学生

- GitHub: [@dsadsasdaddas](https://github.com/dsadsasdaddas)

---

<div align="center">

### ⭐ 如果这个项目对你有帮助，请给一个 Star！

</div>