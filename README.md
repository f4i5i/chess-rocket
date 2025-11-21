# Chess Puzzle Trainer

A desktop-only chess puzzle training application built with React, designed to help users improve their chess tactics through interactive puzzle solving.

## Features

### Puzzle Player Interface
- **Interactive Chess Board**: Play chess puzzles with move validation
- **Real-time Feedback**: Visual indicators for correct/incorrect moves
- **Session Statistics**: Track your progress with:
  - Solved puzzles count
  - Current streak
  - Rating (ELO-like system)
  - Accuracy percentage
  - Average solving time
- **Move History**: View all moves in algebraic notation
- **Timer**: Track time spent on each puzzle
- **Hint System**: Get hints when stuck
- **Solution Display**: View the complete solution
- **Navigation**: Move between puzzles easily

### Admin Interface
- **Puzzle Management**: Add, edit, and delete puzzles
- **Puzzle Form**: Create puzzles with:
  - FEN position
  - Solution sequence
  - Player color
  - Difficulty rating
  - Category (tactics, endgame, opening, middlegame)
  - Description
- **Puzzle List**: View all puzzles in a table format
- **Import/Export**: Backup and restore puzzles in JSON format
- **Test Puzzles**: Test puzzles directly from the admin panel
- **Statistics**: View puzzle distribution by category

## Technology Stack

- **React 18+**: Frontend framework
- **Vite**: Build tool and dev server
- **chess.js**: Chess move validation and game logic
- **react-chessboard**: Chess board UI component
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **LocalStorage**: Data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
chess-puzzle-app/
├── src/
│   ├── components/
│   │   ├── PuzzlePlayer/
│   │   │   ├── ChessBoard.jsx          # Chess board component
│   │   │   ├── MoveHistory.jsx         # Move history display
│   │   │   ├── SessionStats.jsx        # Session statistics
│   │   │   ├── ActionButtons.jsx       # Action buttons (hint, solution, etc.)
│   │   │   ├── Timer.jsx               # Timer component
│   │   │   └── PuzzlePlayer.jsx        # Main puzzle player
│   │   ├── Admin/
│   │   │   ├── PuzzleForm.jsx          # Add/edit puzzle form
│   │   │   ├── PuzzleList.jsx          # Puzzle list table
│   │   │   └── Admin.jsx               # Admin interface
│   │   └── common/
│   │       ├── Button.jsx              # Reusable button component
│   │       └── Modal.jsx               # Modal component
│   ├── hooks/
│   │   ├── useChessGame.js             # Chess game logic hook
│   │   ├── usePuzzleManager.js         # Puzzle management hook
│   │   ├── useLocalStorage.js          # LocalStorage hook
│   │   └── useTimer.js                 # Timer hook
│   ├── utils/
│   │   ├── chessHelper.js              # Chess utility functions
│   │   └── puzzleStorage.js            # LocalStorage operations
│   ├── data/
│   │   └── samplePuzzles.js            # Sample puzzle data
│   ├── App.jsx                          # Main app component
│   ├── main.jsx                         # Entry point
│   └── index.css                        # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Usage

### Playing Puzzles

1. Click on "Play Puzzles" in the navigation bar
2. The puzzle board will display with the starting position
3. Make moves by dragging and dropping pieces
4. Green highlight = correct move
5. Red highlight = incorrect move
6. Use action buttons to get hints or view the solution
7. Navigate between puzzles using Previous/Next buttons

### Managing Puzzles

1. Click on "Admin" in the navigation bar
2. Click "Add New Puzzle" to create a puzzle
3. Fill in the form:
   - **FEN**: Chess position in FEN notation
   - **Solution**: Comma-separated moves (e.g., "e2e4, e7e5, Nf3")
   - **Player Color**: White or Black
   - **Difficulty**: Rating number (e.g., 1200)
   - **Category**: Tactics, Endgame, Opening, or Middlegame
   - **Description**: Optional hint or description
4. Click "Add Puzzle" to save
5. Edit or delete existing puzzles from the list
6. Export puzzles to JSON for backup
7. Import puzzles from JSON file

## Puzzle Format

Puzzles are stored in the following format:

```javascript
{
  id: "puzzle-1",
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  solution: ["e2e4", "e7e5", "Nf3"],
  playerColor: "white",
  difficulty: 1200,
  category: "tactics",
  description: "Find the best move"
}
```

## LocalStorage Keys

- `chess_puzzles`: Array of all puzzles
- `user_stats`: User statistics and progress

## Statistics System

The app tracks the following statistics:
- **Rating**: Starts at 1200, increases by 10 for correct solutions, decreases by 5 for failures
- **Solved**: Total number of puzzles solved successfully
- **Streak**: Current consecutive correct solutions
- **Accuracy**: Percentage of puzzles solved correctly
- **Average Time**: Average time spent per puzzle (in seconds)

## Design Features

- **Board Colors**: Light blue (#A0C4E0) and dark blue (#6B9ABD) squares
- **Visual Feedback**: Green for correct moves, red for incorrect moves
- **Responsive Layout**: Optimized for desktop (minimum 1024px width)
- **Clean UI**: Modern, minimalist design with clear hierarchy

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Sample Puzzles

The app comes with 15 sample puzzles covering:
- Basic checkmates
- Tactical patterns
- Opening principles
- Endgame techniques

## Future Enhancements

Potential features to add:
- Puzzle filtering by difficulty/category
- User accounts and cloud sync
- Daily puzzle challenges
- Leaderboards
- Puzzle collections/themes
- Puzzle ratings and comments
- Spaced repetition system
- Mobile responsive design

## License

MIT

## Credits

Built with:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [chess.js](https://github.com/jhlywa/chess.js)
- [react-chessboard](https://github.com/Clariity/react-chessboard)
- [Tailwind CSS](https://tailwindcss.com/)
