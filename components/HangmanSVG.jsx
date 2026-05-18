const MAX_WRONG = 6;

export function HangmanSVG({ wrongCount }) {
  const s = wrongCount >= MAX_WRONG ? "#ff2d55" : "#e8e8f0";
  const dead = wrongCount >= MAX_WRONG;
  return (
    <svg width="230" height="230" viewBox="0 0 260 260">
      <line x1="30" y1="250" x2="230" y2="250" stroke="#2a2a3a" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="250" x2="60" y2="20" stroke="#2a2a3a" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="20" x2="200" y2="20" stroke="#2a2a3a" strokeWidth="4" strokeLinecap="round"/>
      <line x1="200" y1="20" x2="200" y2="56" stroke="#2a2a3a" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="50" x2="100" y2="20" stroke="#2a2a3a" strokeWidth="3" strokeLinecap="round"/>
      {wrongCount>=1&&<circle cx="200" cy="80" r="24" stroke={s} strokeWidth="4" fill="none"/>}
      {dead&&<><line x1="189" y1="73" x2="196" y2="80" stroke="#ff2d55" strokeWidth="3" strokeLinecap="round"/>
        <line x1="196" y1="73" x2="189" y2="80" stroke="#ff2d55" strokeWidth="3" strokeLinecap="round"/>
        <line x1="204" y1="73" x2="211" y2="80" stroke="#ff2d55" strokeWidth="3" strokeLinecap="round"/>
        <line x1="211" y1="73" x2="204" y2="80" stroke="#ff2d55" strokeWidth="3" strokeLinecap="round"/>
        <path d="M190 90 Q200 96 210 90" stroke="#ff2d55" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>}
      {wrongCount>=2&&<line x1="200" y1="104" x2="200" y2="190" stroke={s} strokeWidth="4" strokeLinecap="round"/>}
      {wrongCount>=3&&<line x1="200" y1="130" x2="158" y2="168" stroke={s} strokeWidth="4" strokeLinecap="round"/>}
      {wrongCount>=4&&<line x1="200" y1="130" x2="242" y2="168" stroke={s} strokeWidth="4" strokeLinecap="round"/>}
      {wrongCount>=5&&<line x1="200" y1="190" x2="162" y2="234" stroke={s} strokeWidth="4" strokeLinecap="round"/>}
      {wrongCount>=6&&<line x1="200" y1="190" x2="238" y2="234" stroke={s} strokeWidth="4" strokeLinecap="round"/>}
    </svg>
  );
}
