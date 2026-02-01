# 📦 NPM Health Scanner

A modern web tool that analyzes the health of any npm package by combining npm registry data and GitHub repository activity into a single health score. Built with Next.js (App Router), Tailwind CSS, and real-world public APIs.

## 🚀 Live Demo

🔗 [Add your Vercel link here after deployment]

**Example:** `https://npm-health-scanner.vercel.app`

---

## 🧠 What Does This Project Do?

**NPM Health Scanner** helps developers quickly answer questions like:

- Is this npm package actively maintained?
- Is it popular and trusted by the community?
- Does it have too many unresolved issues?
- Is it safe to use in production?

Instead of checking npm, GitHub, and stats manually, this tool gives you **one simple score**.

---

## ✨ Features

- 🔍 **Search any npm package** by name
- 📊 **Calculates a health score** (0–100)
- 🟢 **Status classification:**
  - Healthy
  - Caution
  - Risky
- 📦 **npm insights:**
  - Weekly downloads
  - Total versions
  - Last published date
- 🐙 **GitHub insights:**
  - Stars
  - Forks
  - Open issues
  - Last commit activity
- 🎨 **Clean, dark-mode UI** (Tailwind CSS)
- ⚡ **Fast API routes** using Next.js App Router

---

## 🧮 How the Health Score Works

The final score is calculated by combining multiple factors:

### 1️⃣ Popularity (npm)
- Weekly download count
- Higher usage → higher score

### 2️⃣ Maintenance (npm)
- How recently the package was published
- Actively released packages score higher

### 3️⃣ Activity (GitHub)
- Last commit date
- Recently updated repos score higher

### 4️⃣ Community (GitHub)
- Stars and forks
- Strong community → higher trust

### 5️⃣ Issues (GitHub)
- Number of open issues
- Too many unresolved issues reduce the score

All these signals are combined into a **final score between 0 and 100**, then mapped to a status:

| Score Range | Status   |
|-------------|----------|
| 80–100      | Healthy  |
| 60–79       | Caution  |
| < 60        | Risky    |

---

## 🛠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React
- Tailwind CSS
- Fetch API

### Backend
- Next.js API Routes
- npm Registry API
- npm Downloads API
- GitHub REST API

### Styling
- Tailwind CSS (dark SaaS-style UI)

---

## 📁 Project Structure
```
app/
├── api/
│   └── scan/
│       └── route.js          # Backend API logic
│
├── library/
│   └── healthscore.js        # Health score calculation logic
│
├── page.js                   # Frontend UI
├── layout.js
├── globals.css
│
public/
└── favicon.ico
```

---

## 🔌 API Endpoint

### `GET /api/scan`

**Query Params:** `?package=axios`

**Example Response:**
```json
{
  "package": "axios",
  "exists": true,
  "npm": {
    "latestVersion": "1.13.4",
    "weeklyDownloads": 82546618,
    "totalVersions": 126,
    "lastPublishedDays": 4
  },
  "github": {
    "repo": "axios/axios",
    "stars": 108567,
    "forks": 11504,
    "openIssues": 314,
    "lastCommitDays": 1
  },
  "score": {
    "value": 88,
    "status": "healthy"
  },
  "warnings": []
}
```

---

## 🔐 Environment Variables

This project uses the **GitHub API** for repository data.

Create a `.env.local` file:
```
GITHUB_TOKEN=your_github_personal_access_token
```

The token is optional but recommended to avoid GitHub rate limits.

---

## 🧑‍💻 How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/npm-health-scanner.git
cd npm-health-scanner
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Add environment variables
```bash
touch .env.local
```

Add:
```
GITHUB_TOKEN=your_token_here
```

### 4️⃣ Start the development server
```bash
npm run dev
```

**Open:** `http://localhost:3000`

---

## 🎯 Why This Project Matters

This project demonstrates:

- ✅ Real API integration
- ✅ Backend logic & scoring systems
- ✅ Clean frontend UI
- ✅ Error handling & loading states
- ✅ Practical problem-solving
- ✅ Production-style project structure

**It's not a clone — it's a real utility.**

---

## 🚧 Future Improvements

- 📈 Charts for score breakdown
- ⭐ Save favorite packages
- 🔍 Compare multiple packages
- 🧪 Add unit tests for scoring logic
- 📱 Mobile-first UI improvements

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Open a pull request

---

## 📜 License

MIT License

---

## 🙌 Acknowledgements

- [npm Registry API](https://registry.npmjs.org)
- [npm Downloads API](https://api.npmjs.org)
- [GitHub REST API](https://docs.github.com/en/rest)
- Next.js & Tailwind CSS communities

---

## ⭐ Final Note

If you're learning full-stack development, this project is a great example of:

- turning raw data into insights
- building real tools, not just demos

**Feel free to ⭐ the repo if you found it useful!**