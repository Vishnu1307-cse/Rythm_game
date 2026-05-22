import { useState, useEffect } from 'react';

const HitCircle = ({ id, x, y, spawnTime, duration, onHit, onTimeout }) => {
  const [clicked, setClicked] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // If not clicked within duration + grace period, it's a miss
    const timeout = setTimeout(() => {
      if (!clicked) {
        onTimeout(id);
      }
    }, duration + 300); // 300ms grace period after approach circle reaches the center

    return () => clearTimeout(timeout);
  }, [clicked, duration, id, onTimeout]);

  const handleClick = (e) => {
    if (clicked) return;
    setClicked(true);
    e.stopPropagation();

    const timeSinceSpawn = Date.now() - spawnTime;
    const diff = Math.abs(duration - timeSinceSpawn);
    
    let score = 0;
    let hitText = '';
    let hitClass = '';

    if (diff < 80) {
      score = 300;
      hitText = '300';
      hitClass = 'hit-300';
    } else if (diff < 150) {
      score = 100;
      hitText = '100';
      hitClass = 'hit-100';
    } else if (diff < 250) {
      score = 50;
      hitText = '50';
      hitClass = 'hit-50';
    } else {
      score = 0;
      hitText = 'X';
      hitClass = 'hit-miss';
    }

    setFeedback({ text: hitText, className: hitClass });
    onHit(id, score);
  };

  return (
    <div 
      className="hit-circle-container" 
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {!clicked && (
        <>
          <div className="hit-circle" onMouseDown={handleClick} />
          <div 
            className="approach-circle" 
            style={{ 
              animation: `approach ${duration}ms linear forwards` 
            }} 
          />
        </>
      )}
      {feedback && (
        <div className={`hit-feedback ${feedback.className}`}>
          {feedback.text}
        </div>
      )}
    </div>
  );
};

export default HitCircle;
