<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0F6E56&height=200&section=header&text=Finance+Manager&fontSize=72&fontColor=E1F5EE&animation=fadeIn&fontAlignY=38&desc=Full-Stack+MERN+%E2%80%A2+JWT+Auth+%E2%80%A2+Excel+Export&descAlignY=60&descColor=9FE1CB" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&color=1D9E75&center=true&vCenter=true&width=600&lines=Manage+client+Buy+%2F+Sell+transactions;Track+pending+payments+in+real-time;Export+financial+records+to+Excel;Secured+with+JWT+authentication" />

<br/><br/>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />

<br/><br/>

<a href="https://online-finance-management.vercel.app/">
  <img src="https://img.shields.io/badge/Live%20Demo-0F6E56?style=for-the-badge&logo=vercel&logoColor=white" />
</a>
&nbsp;
<a href="https://github.com/MohdShanChoudhary">
  <img src="https://img.shields.io/badge/Source%20Code-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

</div>

---

## Overview

**Online Finance Management** is a full-stack MERN application built for a single authenticated admin to manage client Buy/Sell transactions, track pending payments, and export financial records to Excel. All data is stored securely in MongoDB Atlas and synced in real-time.

---

## Features

| Feature | Description |
|---------|-------------|
| Add / Edit / Delete | Full CRUD for client transactions |
| Buy / Sell tracking | Filter records by transaction type |
| Pending amount | Automatic calculation per client |
| Excel export | Download records via `exceljs` |
| JWT authentication | Secure admin login |
| MongoDB Atlas | Cloud database, always available |
| Responsive UI | Works on desktop and mobile |

---

## Project Structure

```
Online_Finance_Management/
│
├── server/                   # Backend
│   ├── index.js              # Express app entry point
│   ├── routes/               # API route handlers
│   ├── models/               # Mongoose schemas
│   ├── middleware/           # JWT auth middleware
│   └── .env                  # Config (never upload this)
│
├── Frontend/                 # Frontend
│   ├── src/
│   │   ├── pages/            # Login, Dashboard, Transactions
│   │   ├── components/       # Reusable UI components
│   │   └── App.js            # Routes
│   └── package.json
│
└── README.md
```

---

## Architecture

```
┌───────────────────────────────────────────────┐
│             React Frontend (Vercel)           │
│                                               │
│   Login Page ──── Dashboard ──── Export       │
│        │               │                     │
│    Axios (HTTP)    Axios (HTTP)               │
└────────┼───────────────┼─────────────────────┘
         │               │
         ▼               ▼
┌───────────────────────────────────────────────┐
│           Node.js + Express (Render)          │
│                                               │
│   POST /api/login     ← JWT issued here       │
│   GET  /api/records   ← protected route       │
│   POST /api/records   ← add transaction       │
│   PUT  /api/records/:id                       │
│   DELETE /api/records/:id                     │
│   GET  /api/export    ← Excel download        │
│                                               │
│   JWT Middleware validates every request      │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
         ┌──────────────────────────┐
         │     MongoDB Atlas        │
         │  - transactions          │
         │  - client records        │
         │  - pending amounts       │
         └──────────────────────────┘
```

---

## Data Flow

```
1. Admin logs in with username + password
         │
         ▼
2. Backend validates credentials from .env
   Issues a signed JWT token
         │
         ▼
3. Frontend stores token, attaches to all requests
         │
         ▼
4. Backend middleware verifies token on every call
         │
         ▼
5. Validated requests hit MongoDB Atlas
   Data returned and rendered in UI
         │
         ▼
6. Admin clicks Export → ExcelJS generates
   .xlsx file → downloaded to browser
```

---

## Login Credentials

> Default admin credentials (stored in `server/.env`):

```
Username : admin
Password : password123
```

These map to `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your `.env` file.

> **Important:** Change `JWT_SECRET` before going to production.

---

## Backend Setup

**Step 1** — Navigate to server folder

```bash
cd server
```

**Step 2** — Install dependencies

```bash
npm install
```

**Step 3** — Create `.env` file

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/moneyDB?retryWrites=true&w=majority

ADMIN_USERNAME=admin
ADMIN_PASSWORD=password123

JWT_SECRET=super_secure_random_secret_12345
```

> Never upload `.env` to GitHub. Add it to `.gitignore`.

**Step 4** — Start backend

```bash
node index.js
```

Runs on: `http://localhost:5000`

---

## Frontend Setup

**Step 1** — Navigate to frontend folder

```bash
cd Frontend
```

**Step 2** — Install dependencies

```bash
npm install
```

**Step 3** — Start app

```bash
npm start
```

Open: `http://localhost:3000`

---

## API Connection

| Environment | URL |
|-------------|-----|
| Local | `http://localhost:5000` |
| Production | `https://online-finance-management.onrender.com` |

Update the base URL in your Axios config or a `.env` variable:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Excel Export

Implemented using [`exceljs`](https://www.npmjs.com/package/exceljs):

- Backend generates `.xlsx` from MongoDB records
- Sent as a file download response
- Triggered from a single button in the UI
- Includes all transaction fields: client name, type, amount, date, pending

---

## Deployment

| Layer | Platform |
|-------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

**Deployment flow:**

```
GitHub push
    │
    ├── Vercel picks up Frontend/ → builds React → live URL
    │
    └── Render picks up server/ → runs Node.js → API URL
```

---

## Local vs Production

| Config | Local | Production |
|--------|-------|------------|
| API URL | `http://localhost:5000` | `https://your-app.onrender.com` |
| WebSocket | — | — |
| Database | MongoDB Atlas | MongoDB Atlas (same) |
| Frontend port | `localhost:3000` | Vercel URL |

---

## Notes

- Render free tier **sleeps after inactivity** — first request may take 30–50 sec
- Always keep `.env` out of version control
- Rotate `JWT_SECRET` before sharing the repo publicly
- MongoDB Atlas free tier has a 512MB storage limit

---

## Technologies Used

**Frontend**
```
React.js          → UI framework
React Router      → Client-side routing
Axios             → HTTP requests
```

**Backend**
```
Node.js           → Runtime
Express.js        → Web framework
Mongoose          → MongoDB ODM
JSON Web Token    → Authentication
ExcelJS           → Excel file generation
```

**Infrastructure**
```
MongoDB Atlas     → Cloud database
Vercel            → Frontend hosting
Render            → Backend hosting
```

---

## Learning Highlights

- Built a complete MERN stack application end-to-end
- Implemented JWT-based authentication from scratch
- Connected React frontend to Express backend via Axios
- Used MongoDB Atlas for cloud-hosted data storage
- Generated downloadable Excel files from live data
- Deployed a full-stack app across Vercel + Render

---

## Author

**Mohd Shan Choudhary**

<a href="https://github.com/MohdShanChoudhary">
  <img src="https://img.shields.io/badge/GitHub-MohdShanChoudhary-181717?style=flat-square&logo=github" />
</a>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0F6E56&height=100&section=footer" width="100%"/>

<img src="https://img.shields.io/badge/Built%20with-MERN%20Stack-1D9E75?style=flat-square" />
&nbsp;
<img src="https://img.shields.io/github/stars/MohdShanChoudhary/online-finance-management?style=social" />

</div>
