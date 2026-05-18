import { useState, useEffect } from "react";
import { ALL_CATEGORY_NAMES, getRandomWords } from "../../backend/data/categories";
import { useSounds } from "../utils/sounds";
import { HangmanSVG } from "./HangmanSVG";
import "../styles/hangman.css";

const MAX_WRONG = 6;
const TIMER_SECONDS = 20;
const BEST_OF = 3; // first to 2 wins

const STAGES = { SETUP: "SETUP", WORD_PICK: "WORD_PICK", HANDOFF: "HANDOFF", GUESSING: "GUESSING", RESULT: "RESULT", MATCH_OVER: "MATCH_OVER" };

const API = "https://hangman-backend-murw.onrender.com"; // your Render URL

async function saveMatch(team1, team2, winner, s1, s2, category) {
  try {
    await fetch(`${API}/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team1, team2, winner, score1: s1, score2: s2, category })
    });
  } catch (e) {
    console.error("Failed to save match", e);
  }
}

export default function HangmanDuelV2() {
  const [stage, setStage] = useState(STAGES.SETUP);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [score, setScore] = useState({ t1: 0, t2: 0 });
  const [round, setRound] = useState(1);
  const [wordCount, setWordCount] = useState(4);
  const [category, setCategory] = useState("🎲 Random");
  const [choices, setChoices] = useState([]);
  const [chosenWord, setChosenWord] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState(0);
  const [winner, setWinner] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [shake, setShake] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timerActive, setTimerActive] = useState(false);
  const [matchWinner, setMatchWinner] = useState(null);
  const sounds = useSounds();

  const pickerTeam = round % 2 === 1 ? team1 : team2;
  const guesserTeam = round % 2 === 1 ? team2 : team1;
  const neededToWin = Math.ceil(BEST_OF / 2);

  // Timer
  useEffect(() => {
    if (!timerActive || stage !== STAGES.GUESSING) return;
    if (timeLeft <= 0) { triggerWrongGuess(true); return; }
    const id = setTimeout(() => {
      setTimeLeft(t => t - 1);
      if (timeLeft <= 5) sounds.urgentTick();
      else if (timeLeft <= 10) sounds.tick();
    }, 1000);
    return () => clearTimeout(id);
  }, [timerActive, timeLeft, stage, sounds]);

  function startGame() {
    if (!team1.trim() || !team2.trim()) return;
    sounds.click();
    setStage(STAGES.WORD_PICK);
    setChoices(getRandomWords(category, wordCount));
    setAnimKey(k => k + 1);
  }

  function pickWord(word) {
    sounds.click();
    setChosenWord(word);
    setGuessed([]);
    setWrong(0);
    setTimeLeft(TIMER_SECONDS);
    setStage(STAGES.HANDOFF);
    setAnimKey(k => k + 1);
  }

  function startGuessing() {
    sounds.click();
    setStage(STAGES.GUESSING);
    setTimerActive(true);
    setAnimKey(k => k + 1);
  }

  function triggerWrongGuess(isTimeout = false) {
    setWrong(prev => {
      const newWrong = prev + 1;
      sounds.wrong();
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (newWrong >= MAX_WRONG) {
        setTimeout(() => endRound("picker"), 400);
      }
      return newWrong;
    });
    setTimeLeft(TIMER_SECONDS);
  }

  function guessLetter(letter) {
    if (guessed.includes(letter)) return;
    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);
    setTimeLeft(TIMER_SECONDS);

    const isCorrect = chosenWord.toUpperCase().includes(letter);
    if (isCorrect) {
      sounds.correct();
      const allGuessed = chosenWord.toUpperCase().split("").every(l => newGuessed.includes(l));
      if (allGuessed) { setTimeout(() => endRound("guesser"), 300); }
    } else {
      sounds.wrong();
      const newWrong = wrong + 1;
      setWrong(newWrong);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (newWrong >= MAX_WRONG) { setTimeout(() => endRound("picker"), 400); }
    }
  }

  function endRound(w) {
    setTimerActive(false);
    setWinner(w);
    let newScore = { ...score };
    if (w === "guesser") {
      if (round % 2 === 1) newScore.t2++; else newScore.t1++;
    } else {
      if (round % 2 === 1) newScore.t1++; else newScore.t2++;
    }
    setScore(newScore);

    if (newScore.t1 >= neededToWin || newScore.t2 >= neededToWin) {
      sounds.win();
      const mWinner = newScore.t1 >= neededToWin ? team1 : team2;
      setMatchWinner(mWinner);
      saveMatch(team1, team2, mWinner, newScore.t1, newScore.t2, category);
      setTimeout(() => setStage(STAGES.MATCH_OVER), 600);
    } else {
      w === "guesser" ? sounds.win() : sounds.lose();
      setTimeout(() => setStage(STAGES.RESULT), 300);
    }
    setAnimKey(k => k + 1);
  }

  function nextRound() {
    sounds.click();
    setRound(r => r + 1);
    setChoices(getRandomWords(category, wordCount));
    setWinner(null);
    setChosenWord("");
    setGuessed([]);
    setWrong(0);
    setTimeLeft(TIMER_SECONDS);
    setTimerActive(false);
    setStage(STAGES.WORD_PICK);
    setAnimKey(k => k + 1);
  }

  function resetGame() {
    sounds.click();
    setStage(STAGES.SETUP);
    setTeam1(""); setTeam2("");
    setScore({ t1: 0, t2: 0 });
    setRound(1);
    setWinner(null);
    setMatchWinner(null);
    setChosenWord("");
    setGuessed([]);
    setWrong(0);
    setTimeLeft(TIMER_SECONDS);
    setTimerActive(false);
    setAnimKey(k => k + 1);
  }

  const wordDisplay = chosenWord.toUpperCase().split("").map(l => ({
    letter: l, revealed: guessed.includes(l),
  }));
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timeLeft <= 5 ? "#ff2d55" : timeLeft <= 10 ? "#ffd60a" : "#00f5d4";

  return (
    <div className="root">
      <div className="wrap">
        <h1 className="title">HANGMAN</h1>
        <p className="subtitle">⚔ Duel Edition · Best of {BEST_OF} ⚔</p>

        {stage !== STAGES.SETUP && (
          <div className="scoreboard fade-in" key={`sc-${animKey}`}>
            <div className="score-team">
              <div className="score-name">{team1 || "Team 1"}</div>
              <div className="score-num t1">{score.t1}</div>
              <div className="pip-row">
                {Array.from({ length: neededToWin }).map((_, i) => (
                  <div key={i} className={`pip${i < score.t1 ? " won-t1" : ""}`} />
                ))}
              </div>
            </div>
            <div>
              <div className="score-div">vs</div>
              <div className="match-progress">Round {round}</div>
            </div>
            <div className="score-team">
              <div className="score-name">{team2 || "Team 2"}</div>
              <div className="score-num t2">{score.t2}</div>
              <div className="pip-row">
                {Array.from({ length: neededToWin }).map((_, i) => (
                  <div key={i} className={`pip${i < score.t2 ? " won-t2" : ""}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SETUP ── */}
        {stage === STAGES.SETUP && (
          <div className="card fade-in">
            <label className="lbl">Team 1 Name</label>
            <input className="inp" placeholder="e.g. The Wizards" value={team1}
              onChange={e => setTeam1(e.target.value)} maxLength={16} />
            <label className="lbl">Team 2 Name</label>
            <input className="inp" placeholder="e.g. Dark Knights" value={team2}
              onChange={e => setTeam2(e.target.value)} maxLength={16} />

            <label className="lbl" style={{ marginBottom: "8px" }}>Word choices per round</label>
            <div className="count-row">
              {[3, 4, 5].map(n => (
                <button key={n} className={`count-btn${wordCount === n ? " on" : ""}`}
                  onClick={() => setWordCount(n)}>{n}</button>
              ))}
            </div>

            <label className="lbl" style={{ marginBottom: "8px" }}>Word category</label>
            <div className="cat-grid">
              {["🎲 Random", ...ALL_CATEGORY_NAMES].map(c => (
                <button key={c} className={`cat-btn${category === c ? " on" : ""}`}
                  onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>

            <button className="btn btn-r" onClick={startGame}
              disabled={!team1.trim() || !team2.trim()}>Start Game</button>
          </div>
        )}

        {/* ── WORD PICK ── */}
        {stage === STAGES.WORD_PICK && (
          <div className="card fade-in" key={`pick-${animKey}`}>
            <span className="badge">Round {round} · Picking Phase</span>
            <p className="sect-label">📖 secret word selector</p>
            <p className="hero-name">{pickerTeam}</p>
            <p className="sect-label" style={{ marginBottom: "12px" }}>
              Pick a word for <span style={{ color: "var(--red)" }}>{guesserTeam}</span> to guess
            </p>
            <div className="choices">
              {choices.map((w, i) => (
                <button key={i} className="choice" onClick={() => pickWord(w)}>{w}</button>
              ))}
            </div>
            <div className="warning">⚠ Make sure {guesserTeam} isn't watching!</div>
          </div>
        )}

        {/* ── HANDOFF SCREEN ── */}
        {stage === STAGES.HANDOFF && (
          <div className="card fade-in" key={`handoff-${animKey}`}>
            <div className="handoff-box">
              <div className="handoff-icon">🔄</div>
              <p className="handoff-title">Pass the device!</p>
              <p className="handoff-sub">
                Hand the screen to<br />
                <span style={{ color: "var(--yellow)", fontWeight: 700, fontSize: "1rem", letterSpacing: "2px" }}>
                  {guesserTeam}
                </span><br />
                <span style={{ fontSize: "0.75rem" }}>
                  {pickerTeam} — keep the word secret! 🤫
                </span>
              </p>
              <button className="btn btn-r" onClick={startGuessing}>
                I'm Ready — Start Guessing!
              </button>
            </div>
          </div>
        )}

        {/* ── GUESSING ── */}
        {stage === STAGES.GUESSING && (
          <div className={`card${shake ? " shake" : ""}`} key={`guess-${animKey}`}>
            <div className="guesser-banner">
              <div>
                <div className="gb-left">guessing now</div>
                <div className="gb-name">{guesserTeam}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="wrong-label">{wrong}/{MAX_WRONG} wrong</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "2px", color: "var(--muted)" }}>
                  {category}
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="timer-wrap">
              <div className="timer-row">
                <span className="timer-label">⏱ time per letter</span>
                <span className="timer-num" style={{ color: timerColor }}>{timeLeft}s</span>
              </div>
              <div className="timer-bar-bg">
                <div className="timer-bar" style={{
                  width: `${timerPct}%`,
                  background: timerColor,
                  boxShadow: `0 0 8px ${timerColor}`
                }} />
              </div>
            </div>

            <div className="hm-area"><HangmanSVG wrongCount={wrong} /></div>

            <div className="wrong-dots">
              {Array.from({ length: MAX_WRONG }).map((_, i) => (
                <div key={i} className={`dot${i < wrong ? " on" : ""}`} />
              ))}
            </div>

            <div className="word-disp">
              {wordDisplay.map((l, i) => (
                <div key={i} className="lb">
                  <span className={`lc${l.revealed ? "" : " h"}`}>{l.revealed ? l.letter : "·"}</span>
                  <div className={`ll${l.revealed ? " rev" : ""}`} />
                </div>
              ))}
            </div>

            <div className="kb">
              {alphabet.map(letter => {
                const isGuessed = guessed.includes(letter);
                const isCorrect = isGuessed && chosenWord.toUpperCase().includes(letter);
                const isWrong = isGuessed && !chosenWord.toUpperCase().includes(letter);
                return (
                  <button key={letter}
                    className={`key${isCorrect ? " cor used" : ""}${isWrong ? " wrg used" : ""}`}
                    onClick={() => guessLetter(letter)} disabled={isGuessed}>
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ROUND RESULT ── */}
        {stage === STAGES.RESULT && (
          <div className="card fade-in" key={`res-${animKey}`}>
            <div className="res-icon">{winner === "guesser" ? "🏆" : "💀"}</div>
            <p className="res-title" style={{ color: winner === "guesser" ? "var(--cyan)" : "var(--red)" }}>
              {winner === "guesser" ? `${guesserTeam} wins!` : `${pickerTeam} wins!`}
            </p>
            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.8rem", marginBottom: "12px", letterSpacing: "1px" }}>
              {winner === "guesser" ? "Word cracked before the hangman fell 🎉" : "The hangman has fallen ☠️"}
            </p>
            <p className="res-word-lbl">The word was</p>
            <p className="res-word">{chosenWord}</p>
            <div className="divider" />
            <div className="scoreboard" style={{ marginBottom: 0 }}>
              <div className="score-team">
                <div className="score-name">{team1}</div>
                <div className="score-num t1">{score.t1}</div>
              </div>
              <div className="score-div">—</div>
              <div className="score-team">
                <div className="score-name">{team2}</div>
                <div className="score-num t2">{score.t2}</div>
              </div>
            </div>
            <div className="divider" />
            <button className="btn btn-r" onClick={nextRound}>Next Round →</button>
            <button className="btn btn-c" onClick={resetGame}>Reset Game</button>
          </div>
        )}

        {/* ── MATCH OVER ── */}
        {stage === STAGES.MATCH_OVER && (
          <div className="card fade-in match-bg" key={`match-${animKey}`}>
            <div className="trophy">🏆</div>
            <p className="match-title">{matchWinner}</p>
            <p className="match-sub" style={{ color: "var(--yellow)" }}>WINS THE MATCH</p>
            <div className="final-scores">
              <div className="fs-team">
                <div className="fs-name">{team1}</div>
                <div className="fs-num" style={{ color: "var(--cyan)" }}>{score.t1}</div>
              </div>
              <div className="fs-team" style={{ alignSelf: "center" }}>
                <div style={{ fontFamily: "'Creepster',cursive", fontSize: "1.5rem", color: "var(--muted)" }}>vs</div>
              </div>
              <div className="fs-team">
                <div className="fs-name">{team2}</div>
                <div className="fs-num" style={{ color: "var(--red)" }}>{score.t2}</div>
              </div>
            </div>
            <div className="divider" />
            <button className="btn btn-r" onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
