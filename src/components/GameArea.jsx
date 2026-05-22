import { useState, useEffect, useRef } from 'react';
import HitCircle from './HitCircle';

const GameArea = ({ onGameOver, updateScore }) => {
  const [circles, setCircles] = useState([]);
  const idCounter = useRef(0);

  // Spawn circles
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const newId = idCounter.current++;
      // Keep circles within bounds (10% to 90% of screen)
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      
      const newCircle = {
        id: newId,
        x,
        y,
        spawnTime: Date.now(),
        duration: 1500 // 1.5s approach time
      };

      setCircles(prev => [...prev, newCircle]);
    }, 1000); // spawn every 1s

    return () => clearInterval(spawnInterval);
  }, []);

  const handleHit = (id, score) => {
    updateScore(score);
    // Remove circle after feedback animation finishes
    setTimeout(() => {
      setCircles(prev => prev.filter(c => c.id !== id));
    }, 500);
  };

  const handleTimeout = (id) => {
    updateScore(0); // miss
    setCircles(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="game-area">
      {circles.map(c => (
        <HitCircle
          key={c.id}
          id={c.id}
          x={c.x}
          y={c.y}
          spawnTime={c.spawnTime}
          duration={c.duration}
          onHit={handleHit}
          onTimeout={handleTimeout}
        />
      ))}
    </div>
  );
};

export default GameArea;
