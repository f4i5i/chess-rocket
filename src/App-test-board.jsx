import React from 'react';
import { Chessboard } from 'react-chessboard';

function App() {
  // Test FEN - Scholar's Mate setup
  const testFen = "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1";

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Test - React Chessboard</h1>
      <p>If you see a custom position (NOT starting position), react-chessboard is working.</p>
      <p><strong>You should see:</strong></p>
      <ul>
        <li>White Queen on h5 (far right, 5th rank)</li>
        <li>White Bishop on c4</li>
        <li>White pawn on e4</li>
        <li>Black knights on c6 and f6</li>
      </ul>
      <div style={{ marginTop: '20px' }}>
        <h2>Test Board with FEN:</h2>
        <p style={{ fontSize: '12px', fontFamily: 'monospace', background: '#f0f0f0', padding: '10px' }}>
          {testFen}
        </p>
        <Chessboard
          position={testFen}
          boardWidth={500}
        />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Default Starting Position:</h2>
        <Chessboard
          boardWidth={500}
        />
      </div>
    </div>
  );
}

export default App;
