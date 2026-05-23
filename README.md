# ⚔️ Hangman Duel (Solo & Duel Edition)

A modern, vibrant, retro-futuristic Hangman game featuring full-blown Humanized AI for Single Player (Solo Mode) and local Pass-and-Play (Duel Mode). Designed with cyber/neon aesthetics, fluid animations, browser-synthesized audio, and real-time custom word constraint filtering.

---

## 🎮 Game Modes

### 👤 Solo Mode (vs AI Bot)
Face off against **Gallows Bot 🤖**. 
* **Dynamic Roles:** The Bot picks a secret word for you in Round 1, and you pick a secret word for the Bot to decipher in Round 2!
* **Balanced 50-50% Win Rate:** The AI doesn't cheat or play perfectly. It simulates natural human gameplay with a **38% humanized mistake rate**. When it fails, it makes *plausible* wrong guesses (like picking common vowels or consonants that are incorrect for the word) rather than guessing completely random letters like `X` or `Z`.
* **Smart Correct Heuristics:** When the Bot decides to make a correct guess, it analyzes the category dictionary, filters down candidate words matching the revealed patterns, and guesses the most statistically frequent letter first (vowels and common letters).

### ⚔️ local Duel Mode
A classic local showdown. 
* Players take turns acting as the **Word Picker** and the **Guesser** in a Best-of-3 match.
* Includes a built-in **device-pass Handoff Screen** to keep picked words secret from your opponent!

---

## ✨ Features

* 🎵 **Web Audio Synthesis:** Dynamic, immersive tone generation (correct, incorrect, winning, losing, urgent ticks) generated in real-time via the browser's native **Web Audio API**—no heavy audio files to load!
* ⏱ **Tactile Countdown Timer:** A 20-second dynamic timer that shrinks, shifts colors, and speeds up synthesizer tick rates as time runs out.
* 🧠 **Curated Categories:** Over 500+ premium, challenging words (7+ letters) organized under:
  * 🧠 General
  * 🔬 Science
  * 🌍 Geography
  * 🎭 Entertainment
  * 💻 Technology
  * 🎲 Random
* 🛸 **High-Fidelity Cyber Aesthetics:** Sleek neon HSL colors, grid backdrops, glassmorphism, pulse states for thinking bots, responsive design, and smooth CSS micro-animations.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite (Fast HMR)
* **Styling:** Vanilla CSS (Custom properties, keyframes, responsive layout grids)
* **Audio:** Web Audio API (Synthesized oscillators)
* **Deployment:** Pre-configured for Vercel SPA routing (`vercel.json` rewrite configuration)

---

## 🚀 Getting Started

### 1. Installation
Clone the repository, navigate to the frontend folder, and install the dependencies:
```bash
npm install
```

### 2. Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
To compile and optimize the assets for production deployment:
```bash
npm run build
```

---

## 📂 Project Structure

```text
frontend/
├── public/              # Static assets (Favicons, etc.)
├── src/
│   ├── components/
│   │   ├── HangmanDuel.jsx   # Main game logic, state, and UI modes
│   │   └── HangmanSVG.jsx    # Vector canvas for the falling hangman
│   ├── styles/
│   │   └── hangman.css       # Neon glow grid stylesheet & keyframes
│   ├── utils/
│   │   ├── categories.js     # Word dataset & constraint-filtering utils
│   │   └── sounds.js         # Web Audio API synthesizers
│   ├── App.jsx               # Root element container
│   └── main.jsx              # React DOM mounting
├── index.html
├── package.json
├── vite.config.js
└── vercel.json           # Vercel Single-Page App redirection rules
```

---

## 🛡️ License
Distributed under the MIT License. Created with ❤️ by Ansika.
