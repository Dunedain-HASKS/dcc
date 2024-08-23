
# Dunedain Code Compiler & Contest Platform

![Hackathon](https://img.shields.io/badge/Hackathon-Tally_2024-orange)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)

This project was developed as part of the nationwide **Tally Hackathon**, where our team was shortlisted among the top 127 from 27,000 entries. Over 48 hours, we built an **online code compiler** platform with features like contests, problem-solving pages, and live leaderboards—all powered by the MERN stack and supporting multiple programming languages.

## 🚀 Features

- **Code Compiler Playground:** Supports C, C++, Java, and Python with live code execution.
- **Problem Solving Page:** Solve existing problems inspired by LeetCode, or add your own challenges.
- **Contest Creation:** Users can create and join contests, and the system maintains a **live leaderboard** to track progress.
- **Persistent Code History:** Users can revisit problems with their last correct submission saved.
- **Leaderboard:** Tracks contest performance and ranks users in real-time.

## 🛠️ Tech Stack

- **Frontend:** React, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployed On:** [Vercel](https://dunedain-code-compiler.vercel.app)

## 📂 Project Structure

```bash
├── client                 # React frontend
│   ├── src
│   ├── public
│   └── package.json
├── server                 # Node.js backend
│   ├── controllers        # Backend business logic
│   ├── models             # Mongoose models
│   ├── routes             # API routes
│   ├── utils              # Utility functions
│   ├── app.js             # Server setup
│   └── package.json
└── README.md
```

## 🌐 Live Demo

Check out the live version of the platform here: [Live Demo](https://dunedain-code-compiler.vercel.app)

## ⚙️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Dunedain-HASKS/dcc.git
   cd dcc
   ```

2. **Install dependencies for both client and server:**

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the `server` directory with the following:

   ```bash
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret
   ```

4. **Run the development server:**

   From the root directory, run:

   ```bash
   cd client && npm start
   cd ../server && npm run dev
   ```

5. **Visit the application:**

   Open your browser and go to `http://localhost:3000`.

## 👨‍💻 Contribution

We welcome contributions! Please fork the repository and create a pull request.

