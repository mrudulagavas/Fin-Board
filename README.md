# 📈 Stock Analytics Dashboard


## 🌟 Overview

**Stock Analytics Dashboard** is a cutting-edge platform designed to empower financial analysts and investors with real-time data-driven insights. Built using **React.js** and **FastAPI**, it seamlessly bridges intuitive UI design with powerful backend analytics. The system provides three robust tools:

- 🔎 **Stock Ratio Dashboard** – Analyze key financial ratios from Balance Sheets, Income Statements, and Cash Flows
- 📊 **Stock Screener** – Discover high-potential stocks using filters like P/E ratio, market cap, and sector
- 📁 **File Management System** – Upload, organize, and share reports with ease

---

## ✨ Key Features

### 📊 Stock Ratio Dashboard
- Tabbed interface for financial statements
- Visual cues for ratio deviations vs. industry benchmarks
- Time-series trend graphs and interactive analytics

### 🔍 Stock Screener
- Advanced filters (e.g., sector, market cap, valuation metrics)
- Real-time pagination and sorting
- One-click redirection to detailed ratio view

### 📁 Report File Management
- Secure upload with real-time progress tracking
- Organize files by type and importance (starring system)
- Download pre-defined financial templates (DCF, LBO models, etc.)

---

## 🛠️ Tech Stack

### 🎯 Frontend
- **React.js** – Modular, responsive components using Hooks
- **Material-UI** – Sleek, professional design system
- **React Router** – Multi-page routing
- **Axios** – Smooth API integration

### ⚙️ Backend
- **FastAPI** – Asynchronous Python backend with blazing speed
- **Pydantic** – Robust data models with type enforcement
- **Python** – Custom financial logic and data sanitization

### 🔌 Data Sources
- External APIs: *Yahoo Finance*, *Alpha Vantage*, others
- Custom ingestion pipelines for scalability

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (v14+)
- Python (3.8+)
- npm or yarn

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stock-analytics-dashboard.git
cd stock-analytics-dashboard

# Install frontend dependencies
cd frontend
npm install
npm start

# Run backend server
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
