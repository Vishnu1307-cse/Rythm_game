import { useState } from 'react';
import GameArea from './components/GameArea';

function App() {
  const [gameState, setGameState] = useState('START_MENU'); // START_MENU, PLAYING, GAME_OVER
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [misses, setMisses] = useState(0);

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setMisses(0);
    setGameState('PLAYING');
  };

  const updateScore = (points) => {
    if (points > 0) {
      setScore(prev => prev + points + (combo * 10)); // Combo bonus
      setCombo(prev => prev + 1);
    } else {
      setCombo(0);
      setMisses(prev => {
        const newMisses = prev + 1;
        if (newMisses >= 10) {
          setGameState('GAME_OVER');
        }
        return newMisses;
      });
    }
  };

  return (
    <div className="app-container">
      {/* Persistent Header UI during gameplay */}
      {gameState === 'PLAYING' && (
        <div className="header-ui">
          <div className="score">Score: {score}</div>
          <div className="misses" style={{ color: '#ff3333' }}>Misses: {misses}/10</div>
          <div className="combo">Combo: {combo}x</div>
        </div>
      )}

      {gameState === 'START_MENU' && (
        <div className="screen">
          <h1 className="title">React Osu!</h1>
          <button className="btn" onClick={startGame}>Start Game</button>
        </div>
      )}

      {gameState === 'PLAYING' && (
        <GameArea onGameOver={() => setGameState('GAME_OVER')} updateScore={updateScore} />
      )}

      {gameState === 'GAME_OVER' && (
        <div className="screen">
          <h1 className="title">Game Over</h1>
          <h2 style={{ fontSize: '40px', color: '#33ccff', marginBottom: '20px' }}>Final Score: {score}</h2>
          <button className="btn" onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
