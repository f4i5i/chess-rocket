// Sample chess puzzles for testing
export const samplePuzzles = [
  {
    id: "puzzle-1",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
    solution: ["Qxf7+"], // Scholar's mate threat
    playerColor: "white",
    difficulty: 1000,
    category: "tactics",
    description: "Find the checkmate in 1 move"
  },
  {
    id: "puzzle-2",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
    solution: ["Bxf7+", "Kxf7", "Ng5+"], // Fried Liver Attack preparation
    playerColor: "white",
    difficulty: 1100,
    category: "tactics",
    description: "Find the best tactical sequence"
  },
  {
    id: "puzzle-3",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
    solution: ["Qxf7+"], // Quick mate
    playerColor: "white",
    difficulty: 900,
    category: "tactics",
    description: "Deliver checkmate"
  },
  {
    id: "puzzle-4",
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 1",
    solution: ["Qh5", "Nc6", "Qxf7+"], // Early queen attack
    playerColor: "white",
    difficulty: 1050,
    category: "tactics",
    description: "Find the winning attack"
  },
  {
    id: "puzzle-5",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 1",
    solution: ["Bxf2+", "Kxf2", "Nxe4+"], // Black tactic
    playerColor: "black",
    difficulty: 1200,
    category: "tactics",
    description: "Win material with a tactical blow"
  },
  {
    id: "puzzle-6",
    fen: "r1b1kbnr/pppp1ppp/2n5/4N3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 1",
    solution: ["Nxf7", "Kxf7", "Qh5+"], // Fork and win
    playerColor: "white",
    difficulty: 1150,
    category: "tactics",
    description: "Sacrifice and win the queen"
  },
  {
    id: "puzzle-7",
    fen: "rnbqkb1r/ppp2ppp/3p1n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
    solution: ["Ng5", "d5", "exd5"], // Winning position
    playerColor: "white",
    difficulty: 1250,
    category: "tactics",
    description: "Create threats and win material"
  },
  {
    id: "puzzle-8",
    fen: "r2qkb1r/ppp2ppp/2np1n2/4p1B1/2B1P1b1/2NP1N2/PPP2PPP/R2QK2R w KQkq - 0 1",
    solution: ["Bxf7+", "Kxf7", "Ne5+"], // Discovery attack
    playerColor: "white",
    difficulty: 1300,
    category: "tactics",
    description: "Find the crushing blow"
  },
  {
    id: "puzzle-9",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 1",
    solution: ["Bxf2+", "Kf1", "Qd3+"], // Black wins
    playerColor: "black",
    difficulty: 1400,
    category: "tactics",
    description: "Find the winning combination"
  },
  {
    id: "puzzle-10",
    fen: "r3k2r/pppq1ppp/2npbn2/2b1p3/2B1P3/2NP1N2/PPPQ1PPP/R3K2R w KQkq - 0 1",
    solution: ["Bxf7+", "Kxf7", "Qxd6"], // Win material
    playerColor: "white",
    difficulty: 1350,
    category: "tactics",
    description: "Sacrifice to win material"
  },
  {
    id: "puzzle-11",
    fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
    solution: ["Bxf7+", "Rxf7", "Ng5"], // Attack on f7
    playerColor: "white",
    difficulty: 1450,
    category: "tactics",
    description: "Attack the weak f7 square"
  },
  {
    id: "puzzle-12",
    fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1",
    solution: ["Qa5+", "Nc3", "Qxb5"], // Win the bishop
    playerColor: "black",
    difficulty: 1100,
    category: "tactics",
    description: "Win material with a check"
  },
  {
    id: "puzzle-13",
    fen: "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
    solution: ["O-O"], // Castle for safety
    playerColor: "white",
    difficulty: 1000,
    category: "opening",
    description: "Find the best developing move"
  },
  {
    id: "puzzle-14",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b kq - 0 1",
    solution: ["O-O"], // Black castles
    playerColor: "black",
    difficulty: 1050,
    category: "opening",
    description: "Complete your development safely"
  },
  {
    id: "puzzle-15",
    fen: "8/5k2/3p4/1p1P4/1P6/1K6/8/8 w - - 0 1",
    solution: ["Ka4", "Ke7", "Kxb5", "Kd7", "Kb6"], // King and pawn endgame
    playerColor: "white",
    difficulty: 1500,
    category: "endgame",
    description: "Win the pawn endgame"
  }
];

// Helper function to get random puzzle
export const getRandomPuzzle = () => {
  return samplePuzzles[Math.floor(Math.random() * samplePuzzles.length)];
};

// Helper function to get puzzles by difficulty range
export const getPuzzlesByDifficulty = (min, max) => {
  return samplePuzzles.filter(p => p.difficulty >= min && p.difficulty <= max);
};

// Helper function to get puzzles by category
export const getPuzzlesByCategory = (category) => {
  return samplePuzzles.filter(p => p.category === category);
};
