import { useState, useEffect } from 'react';

export default function ExperienceBar() {
  const maxProgress = 600;
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState(0);

  const getPercent = function(p: number) {
    const percent = (p * 100) / maxProgress;
    return Math.ceil(percent);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < maxProgress) {
        setProgress(progress + 1);
      } else {
        setLevel(level + 1);
        setProgress(0);
      }
    }, 100);
    
    return () => {
      clearInterval(timer);
    }
  }, [progress, level]);

  return (
    <div>
      <header className="experience-bar">
        <span>0 exp</span>
        <div>
          <div style={{ width: `${getPercent(progress)}%` }} />
          <span className="corrent-experience" style={{ left: `${getPercent(progress)}%` }}>{progress} exp</span>
        </div>
        <span>{maxProgress} exp</span>
      </header>
    </div>
  )
}