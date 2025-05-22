
# 💰 Expense Management System

A full-stack web application for tracking and managing personal or business finances. Users can log income and expenses, categorize them, and analyze spending habits through intuitive charts and tables.

[Live Demo](https://expense-management-system-delta.vercel.app) | [GitHub Repo](https://github.com/Prashant1694/Expense-management-System)

---

## ✨ Features

- 🔐 **User Authentication**: Secure registration and login.
- 📊 **Dashboard Overview**:
  - Total Transactions, Turnover
  - Pie charts for income vs expense ratio
- 📆 **Filter by Time**: View data for the last week, last month, or all transactions.
- 📂 **Category-wise Breakdown**:
  - Income and expenses grouped into user-defined categories.
- 🔄 **Transaction Management**:
  - Add, edit, and delete transactions.
- 📈 **View Toggle**: Switch between tabular list and chart visualizations.

---

## 🖼️ Screenshots

### Dashboard Overview
![Dashboard](./screenshots/Screenshot%202024-12-02%20134613.png)

### Category-wise Expense & Income
![Category Breakdown](./screenshots/Screenshot%202024-12-02%20134646.png)

### Transaction Table View
![Transaction Table](./screenshots/Screenshot%202024-12-02%20134818.png)

### Add/Edit Transactions
![Add/Edit](./screenshots/Screenshot%202024-12-02%20134957.png)

### Authentication - Login & Register
![Login](./screenshots/Screenshot%202024-12-02%20135026.png)
![Register](./screenshots/Screenshot%202024-12-02%20135054.png)

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Prashant1694/Expense-management-System.git
cd Expense-management-System
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run Locally
```bash
npm start
```

> Make sure to set up `.env` for backend services (if separate) including:
```
MONGO_URI=
JWT_SECRET=
```

---

## 📁 Folder Structure

```
.
├── client/                # React frontend
├── server/                # Express backend
├── public/
├── screenshots/           # UI images for README
├── .env
└── README.md
```

---

## 🧑‍💻 Author

**Prashant**  
🔗 [GitHub](https://github.com/Prashant1694)

---

## 📜 License

This project is licensed under the MIT License.
