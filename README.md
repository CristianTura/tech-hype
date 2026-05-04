# 🚀 Tech Hype Board

This project consists of a fullstack application that processes and displays video data from a simulated external source (YouTube-like API).

It is divided into:

* **Backend**: NestJS API that filters, transforms, and enriches the data
* **Frontend**: React application that consumes the API and displays the UI

---

## 📁 Project Structure

```text
root/
  tech-hype-api/
  tech-hype-front/
  DECISIONS.md
  README.md
```

---

## ⚙️ Requirements

Make sure you have installed:

* Node.js (v18+ recommended)
* npm or yarn

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/CristianTura/tech-hype.git
cd techhype
```

---

### 2. Install Backend Dependencies

```bash
cd tech-hype-api
npm install
```

---

### 3. Configure Environment Variables

#### Backend Environment Variables
Create a `.env` file in the `tech-hype-api` directory and add:
```
NODE_ENV=development
PORT=3000
```

#### Frontend Environment Variables
Create a `.env` file in the `tech-hype-front` directory and add:
```
VITE_API_BASE_URL=http://localhost:3000
```

---

### 4. Install Frontend Dependencies

```bash
cd ../tech-hype-front
npm install
```

---

## ▶️ Running the Project

### 1. Start Backend

```bash
cd tech-hype-api
npm run start:dev
```

Backend will run on:

```
http://localhost:3000
```

---

### 2. Start Frontend

```bash
cd ../tech-hype-front
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔗 API Endpoint

Main endpoint:

```
GET /api/videos
```

Supports query parameters:

* `author`
* `minHype`
* `sortBy` (hype | date)
* `order` (asc | desc)
* `page`
* `limit`

Example:

```
http://localhost:3000/api/videos?sortBy=hype&order=desc&page=1&limit=10
```

---

## 🧪 Running Tests

### Backend Tests

```bash
cd tech-hype-api
npm run test
```

### Frontend Tests

```bash
cd tech-hype-front
npm run test
```

For coverage:

```bash
cd tech-hype-front
npm run test:coverage
```

---

## ✨ Features

### Backend

* Data transformation from raw JSON
* Hype score calculation with business rules
* Filtering, sorting, and pagination

### Frontend

* Feature-based architecture
* Infinite scroll (IntersectionObserver)
* Filter controls connected to backend
* Skeleton loading states
* Highlighted "Featured Video"

---

## 🚀 Deployment

### Backend (Vercel)
- **API URL**: `https://tech-hype.vercel.app` ✅
- **Environment Variables**: Vercel automatically sets `NODE_ENV=production`

### Frontend (Vercel)
- **Frontend URL**: [Pending deployment]
- **Environment Variable**: `VITE_API_BASE_URL=https://tech-hype.vercel.app`

### Local Development
Use the local configuration as shown in the setup instructions above.

---

## � Additional Documentation
## ��📄 Additional Documentation

* See `DECISIONS.md` for architectural decisions and development process

---

## 🚀 How to Use

1. Start backend
2. Start frontend
3. Open the app in your browser
4. Explore filters and scroll to load more content

---
