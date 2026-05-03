# 💸 SpendSmart — Advanced Expense Tracker

A colorful, multi-page expense tracker built with HTML, CSS, JS (frontend) and Python Flask + SQLite (backend).

---

## 📁 Project Structure

```
expense-pro/
├── backend/
│   └── app.py          ← Flask server (all APIs)
├── frontend/
│   ├── index.html      ← Dashboard page
│   ├── add.html        ← Add Expense page
│   ├── history.html    ← Full history + search
│   ├── style.css       ← All styles
│   └── script.js       ← Shared JavaScript
└── README.md
```

---

## 🚀 How to Run

### 1. Install dependencies (once)
```bash
pip install flask flask-cors
```

### 2. Start the backend
```bash
cd backend
python app.py
```
Server runs at: `http://127.0.0.1:5000`

### 3. Open frontend
Double-click `frontend/index.html` in your browser.

---

## 🎯 Pages

| Page | File | What it does |
|------|------|--------------|
| Dashboard | index.html | Stats, category breakdown, recent expenses |
| Add Expense | add.html | Form to add new expense with category pills |
| History | history.html | Full list with search & filter, delete |

## 🔌 API Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /expenses | Get all expenses |
| POST | /expenses | Add new expense |
| DELETE | /expenses/\<id\> | Delete an expense |
| GET | /expenses/summary | Category totals |


Team Name: Spidermans
Team Members: 
Sana - 2502140066
Shubh Mehrotra - 2502140137