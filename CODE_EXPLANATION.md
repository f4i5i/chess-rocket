# Chess Puzzle Trainer - Complete Code Explanation

This document provides a comprehensive explanation of all code files in the Chess Puzzle Trainer application.

---

## 📁 Project Structure

```
Chess/
├── src/                      # Source code
│   ├── components/          # React components
│   │   ├── common/         # Reusable UI components
│   │   ├── Admin/          # Admin panel components
│   │   └── PuzzlePlayer/   # Game/puzzle components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── data/               # Sample/mock data
│   ├── App.jsx             # Main app component
│   └── main.jsx            # App entry point
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Build configuration
└── tailwind.config.js      # Styling configuration
```

---

## 🎯 Application Overview

**Chess Puzzle Trainer** is a React-based web application that helps users improve their chess skills through interactive puzzles. Users solve chess positions, track their progress, and view statistics.

**Tech Stack:**
- **React 19.2** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **chess.js** - Chess logic & validation
- **react-chessboard** - Chess board UI
- **Zustand** - State management (if used)

---

## 📄 Root Configuration Files

### `package.json`
**Purpose:** Project configuration and dependency management

**Key Sections:**
```json
{
  "scripts": {
    "dev": "vite",              // Start development server
    "build": "vite build",      // Build for production
    "lint": "eslint .",         // Check code quality
    "preview": "vite preview"   // Preview production build
  },
  "dependencies": {
    "chess.js": "Chess logic engine",
    "react-chessboard": "Chess board UI component",
    "react": "UI library"
  }
}
```

**When to modify:** Add new dependencies with `npm install package-name`

---

### `vite.config.js`
**Purpose:** Vite build tool configuration

**What it does:**
- Configures React plugin
- Sets up build options
- Defines dev server settings
- Configures path aliases

**Example:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 }
})
```

**When to modify:** Change port, add plugins, configure build output

---

### `tailwind.config.js`
**Purpose:** Tailwind CSS customization

**What it does:**
- Defines custom colors
- Sets up fonts
- Configures responsive breakpoints
- Extends default theme

**Example:**
```javascript
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#4F39F6'
      }
    }
  }
}
```

**When to modify:** Add custom colors, fonts, or spacing

---

### `eslint.config.js`
**Purpose:** Code quality and style rules

**What it does:**
- Enforces coding standards
- Catches potential bugs
- Ensures consistent code style

**When to modify:** Add/remove linting rules

---

### `index.html`
**Purpose:** HTML entry point

**What it does:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Chess Puzzle Trainer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Note:** React mounts to `<div id="root">`

---

## 🚀 Entry Point Files

### `src/main.jsx`
**Purpose:** Application bootstrap - first file that runs

**What it does:**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**Responsibilities:**
1. Imports React and ReactDOM
2. Imports root App component
3. Imports global CSS
4. Mounts React app to DOM element #root
5. Wraps app in StrictMode for development warnings

**When to modify:**
- Add global providers (Context, Redux, Router)
- Add global error boundaries
- Configure analytics or monitoring

---

### `src/App.jsx`
**Purpose:** Main application component - routing and layout

**What it does:**
```javascript
import PuzzlePlayer from './components/PuzzlePlayer/PuzzlePlayer'
import LeftSidebar from './components/common/LeftSidebar'
import TopNavBar from './components/common/TopNavBar'

function App() {
  return (
    <div className="app">
      <LeftSidebar />
      <TopNavBar />
      <PuzzlePlayer />
    </div>
  )
}

export default App
```

**Responsibilities:**
1. Defines overall app layout
2. Includes navigation components
3. Renders main content area
4. Manages global state (if any)

**When to modify:**
- Add new pages/routes
- Change layout structure
- Add global providers

---

## 🎨 Common Components (`src/components/common/`)

### `LeftSidebar.jsx`
**Purpose:** Navigation sidebar on the left side

**What it does:**
```javascript
const LeftSidebar = () => {
  const menuItems = [
    { name: 'Home', icon: <HomeIcon />, active: false },
    { name: 'Training', icon: <TrainingIcon />, active: true },
    { name: 'Puzzles', icon: <PuzzleIcon />, active: false },
    // ... more items
  ]

  return (
    <div className="sidebar">
      {/* Logo */}
      <img src={ChessRocketLogo} />

      {/* User Profile */}
      <div className="profile">
        <img src={avatarImage} />
        <span>Kenny</span>
      </div>

      {/* Stats */}
      <div>Current Level: 12</div>
      <div>Total Puzzles: 569</div>

      {/* Navigation Menu */}
      {menuItems.map(item => (
        <button className={item.active ? 'active' : ''}>
          {item.icon}
          {item.name}
        </button>
      ))}
    </div>
  )
}
```

**Key Features:**
- Displays user avatar and profile
- Shows user stats (level, puzzles completed)
- Navigation menu with active state
- Icons for each menu item

**Styling:**
- Width: 284px
- Fixed position on left
- Background: #FCFCFC
- Custom fonts: Inter Display

**When to modify:**
- Add new menu items
- Change user stats
- Update styling/colors

---

### `TopNavBar.jsx`
**Purpose:** Top navigation bar with actions

**What it does:**
```javascript
const TopNavBar = ({ puzzleRating = 1204 }) => {
  return (
    <div className="top-nav">
      {/* Back Arrow */}
      <BackArrowIcon />

      {/* Title */}
      <h1>Puzzle - Rating Climb</h1>

      {/* Right Section */}
      <button>Give Up</button>
      <button>Puzzle Rating: {puzzleRating}</button>

      {/* User Avatar */}
      <img src={avatarImage} />
    </div>
  )
}
```

**Key Features:**
- Back navigation button
- Page title
- "Give Up" button
- Current puzzle rating display
- User avatar

**Props:**
- `puzzleRating` (number): Current puzzle difficulty rating

**Styling:**
- Height: 72px
- Fixed position at top
- Background: #F7F8FA

**When to modify:**
- Add new action buttons
- Change title dynamically
- Add notifications

---

### `Button.jsx`
**Purpose:** Reusable button component

**What it does:**
```javascript
const Button = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false
}) => {
  const variants = {
    primary: 'bg-purple-600 text-white',
    secondary: 'bg-gray-200 text-gray-700',
    danger: 'bg-red-600 text-white'
  }

  return (
    <button
      className={`btn ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

**Props:**
- `children`: Button text/content
- `variant`: 'primary' | 'secondary' | 'danger'
- `onClick`: Click handler function
- `disabled`: Boolean to disable button

**Use Cases:**
```javascript
<Button variant="primary" onClick={handleSubmit}>
  Submit
</Button>

<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>
```

**When to modify:**
- Add new button variants
- Add loading states
- Add icon support

---

### `Modal.jsx`
**Purpose:** Reusable modal/dialog component

**What it does:**
```javascript
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {children}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {footer}
        </div>
      </div>
    </div>
  )
}
```

**Props:**
- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Called when modal closes
- `title` (string): Modal title
- `children`: Modal body content
- `footer`: Modal footer content (buttons)

**Use Cases:**
```javascript
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Puzzle Completed!"
  footer={
    <>
      <Button variant="secondary" onClick={handleClose}>Close</Button>
      <Button variant="primary" onClick={handleNext}>Next Puzzle</Button>
    </>
  }
>
  <p>Great job! You solved the puzzle in 2:34</p>
</Modal>
```

**Features:**
- Overlay background
- Click outside to close
- Escape key to close
- Custom footer with buttons

---

## ♟️ Puzzle Player Components (`src/components/PuzzlePlayer/`)

### `PuzzlePlayer.jsx`
**Purpose:** Main game container - orchestrates entire puzzle gameplay

**What it does:**
This is the **most complex component** - it manages all game logic and state.

```javascript
const PuzzlePlayer = () => {
  // Get puzzle data and management functions
  const {
    currentPuzzle,
    currentPuzzleIndex,
    totalPuzzles,
    sessionStats,
    nextPuzzle,
    previousPuzzle,
    completePuzzle,
    updateSessionStats
  } = usePuzzleManager()

  // Chess game state and functions
  const {
    chess,
    fen,
    moveHistory,
    currentTurn,
    lastMove,
    move,
    resetGame,
    getLegalMoves
  } = useChessGame(currentPuzzle?.fen || 'start')

  // Timer
  const { time, isRunning, start, stop, reset, restart } = useTimer()

  // Local state
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0)
  const [puzzleStatus, setPuzzleStatus] = useState('playing')
  const [feedback, setFeedback] = useState(null)
  const [highlightSquares, setHighlightSquares] = useState({})
  const [showHint, setShowHint] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [boardDisabled, setBoardDisabled] = useState(false)

  // Initialize puzzle when it changes
  useEffect(() => {
    if (currentPuzzle) {
      resetGame(currentPuzzle.fen)
      setCurrentSolutionIndex(0)
      setPuzzleStatus('playing')
      restart()
      // Enable board after delay to prevent phantom moves
      setTimeout(() => setBoardDisabled(false), 1000)
    }
  }, [currentPuzzle])

  // Auto-play opponent moves
  useEffect(() => {
    const isPlayerTurn =
      (currentTurn === 'w' && currentPuzzle.playerColor === 'white') ||
      (currentTurn === 'b' && currentPuzzle.playerColor === 'black')

    if (!isPlayerTurn) {
      // Opponent's turn - auto-play their move
      setBoardDisabled(true)
      setTimeout(() => {
        const expectedMove = currentPuzzle.solution[currentSolutionIndex]
        move(expectedMove)
        setCurrentSolutionIndex(prev => prev + 1)
        setBoardDisabled(false)
      }, 500)
    }
  }, [currentTurn, currentSolutionIndex])

  // Check if puzzle is complete
  useEffect(() => {
    if (currentSolutionIndex >= currentPuzzle.solution.length) {
      handlePuzzleComplete(true)
    }
  }, [currentSolutionIndex])

  // Handle player's piece drop
  const handlePieceDrop = (sourceSquare, targetSquare, piece) => {
    if (boardDisabled || puzzleStatus !== 'playing') {
      return false
    }

    // Build move object
    const playerMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Auto-promote to queen
    }

    // Get expected move from solution
    const expectedMove = currentPuzzle.solution[currentSolutionIndex]

    // Try to make the move
    const result = move(playerMove)
    if (!result) {
      setFeedback({ type: 'error', message: 'Illegal move!' })
      return false
    }

    // Check if it matches solution
    if (movesMatch(result, expectedMove)) {
      // Correct move!
      setHighlightSquares({
        [sourceSquare]: { backgroundColor: 'rgba(16, 185, 129, 0.4)' },
        [targetSquare]: { backgroundColor: 'rgba(16, 185, 129, 0.4)' }
      })
      setFeedback({ type: 'success', message: 'Correct move!' })
      setCurrentSolutionIndex(prev => prev + 1)
      return true
    } else {
      // Incorrect move - undo it
      chess.undo()
      setHighlightSquares({
        [sourceSquare]: { backgroundColor: 'rgba(239, 68, 68, 0.4)' },
        [targetSquare]: { backgroundColor: 'rgba(239, 68, 68, 0.4)' }
      })
      setFeedback({ type: 'error', message: 'Incorrect move! Try again.' })

      // Clear highlight after delay
      setTimeout(() => {
        setHighlightSquares({})
        setFeedback(null)
      }, 1500)

      return false
    }
  }

  // Handle puzzle completion
  const handlePuzzleComplete = (success) => {
    stop() // Stop timer
    setPuzzleStatus(success ? 'completed' : 'failed')
    completePuzzle(success, time)
    updateSessionStats()

    setModalContent({
      title: success ? '🎉 Puzzle Solved!' : '😞 Puzzle Failed',
      message: success
        ? `Great job! You solved the puzzle in ${formatTime(time)}`
        : 'Better luck next time! Try the next puzzle.'
    })
    setShowModal(true)
  }

  // Handle hint button
  const handleHint = () => {
    const expectedMove = currentPuzzle.solution[currentSolutionIndex]
    const parsedMove = parseMove(expectedMove)

    if (parsedMove) {
      setHintSquare(parsedMove.from)
      setShowHint(true)
      setFeedback({
        type: 'info',
        message: `Hint: Move the piece from ${parsedMove.from}`
      })

      setTimeout(() => {
        setShowHint(false)
        setHintSquare(null)
        setFeedback(null)
      }, 3000)
    }
  }

  // Handle show solution button
  const handleShowSolution = () => {
    const remainingSolution = currentPuzzle.solution.slice(currentSolutionIndex)
    setModalContent({
      title: '📖 Solution',
      message: `The solution is: ${remainingSolution.join(', ')}`
    })
    setShowModal(true)
  }

  return (
    <div className="puzzle-player">
      <TopNavBar puzzleRating={1204} />

      {/* Feedback message */}
      {feedback && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <div className="main-content">
        {/* Chess Board Section */}
        <div className="board-container">
          <ChessBoard
            position={fen}
            onPieceDrop={handlePieceDrop}
            playerColor={currentPuzzle.playerColor}
            disabled={boardDisabled}
            highlightSquares={highlightSquares}
            lastMove={lastMove}
            showHint={showHint}
            hintSquare={hintSquare}
          />

          {/* Bottom Controls */}
          <div className="controls">
            {/* White/Black to Move */}
            <div>
              <KingIcon />
              <span>{currentTurn === 'w' ? 'White' : 'Black'} to Move</span>
            </div>

            {/* Settings, Timer, Navigation */}
            <div>
              <button><SettingsIcon /></button>
              <div className="timer">{formatTime(time)}</div>
              <button onClick={previousPuzzle}><LeftArrow /></button>
              <button onClick={nextPuzzle}><RightArrow /></button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={handleHint}>
              <LightbulbIcon /> Get a Hint
            </button>
            <button onClick={handleShowSolution}>
              <EyeIcon /> Solution
            </button>
            <button>
              <BookIcon /> Analysis
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="sidebar">
          <SessionStats stats={sessionStats} averageTime={sessionStats.averageTime} />
          <MoveHistory moves={moveHistory} currentMoveIndex={moveHistory.length - 1} />
        </div>
      </div>

      {/* Completion Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={nextPuzzle}>
              Next Puzzle
            </Button>
          </>
        }
      >
        <p>{modalContent.message}</p>
      </Modal>
    </div>
  )
}
```

**Key Responsibilities:**
1. **Puzzle Management**: Load current puzzle, track progress
2. **Game State**: Manage chess position, moves, turn
3. **Move Validation**: Check if player moves match solution
4. **Feedback**: Show success/error messages
5. **Highlighting**: Visual feedback on squares
6. **Auto-play**: Computer makes opponent moves automatically
7. **Timer**: Track time spent on puzzle
8. **Hints**: Show hints when requested
9. **Completion**: Handle puzzle completion (success/failure)
10. **Navigation**: Previous/next puzzle
11. **Modal**: Show completion dialog

**State Variables:**
- `currentSolutionIndex`: Which move in solution we're on
- `puzzleStatus`: 'playing' | 'completed' | 'failed'
- `feedback`: Success/error messages
- `highlightSquares`: Which squares to highlight
- `showHint`: Whether to show hint
- `boardDisabled`: Disable board during opponent moves
- `showModal`: Show/hide completion modal

**When to modify:**
- Add new game features
- Change move validation logic
- Add multiplayer functionality
- Change puzzle flow

---

### `ChessBoard.jsx`
**Purpose:** Renders interactive chess board

**What it does:**
```javascript
import { Chessboard } from 'react-chessboard'

const ChessBoard = ({
  position,
  onPieceDrop,
  playerColor,
  disabled,
  highlightSquares,
  lastMove,
  showHint,
  hintSquare
}) => {
  // Custom square styles
  const customSquareStyles = {
    ...highlightSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    }),
    ...(showHint && hintSquare && {
      [hintSquare]: { backgroundColor: 'rgba(59, 130, 246, 0.6)' }
    })
  }

  return (
    <Chessboard
      position={position}
      onPieceDrop={onPieceDrop}
      boardOrientation={playerColor}
      arePiecesDraggable={!disabled}
      customSquareStyles={customSquareStyles}
      boardWidth={638}
    />
  )
}
```

**Props:**
- `position` (string): FEN string of current position
- `onPieceDrop` (function): Called when piece is dropped
- `playerColor` ('white' | 'black'): Board orientation
- `disabled` (boolean): Disable piece dragging
- `highlightSquares` (object): Squares to highlight
- `lastMove` (object): Last move made
- `showHint` (boolean): Show hint highlighting
- `hintSquare` (string): Square to highlight for hint

**Features:**
- Drag and drop pieces
- Custom square highlighting
- Board orientation (flip board)
- Disable interaction
- Show last move
- Show hints

**Styling:**
- Size: 638px × 638px
- Custom piece set
- Square colors

---

### `SessionStats.jsx`
**Purpose:** Display current session statistics

**What it does:**
```javascript
const SessionStats = ({ stats, averageTime }) => {
  return (
    <div className="session-stats">
      <h3>Current Session</h3>

      {/* Solved */}
      <div className="stat-row">
        <div>
          <SolvedIcon />
          <span>Solved</span>
        </div>
        <span>{stats.solved}</span>
      </div>

      {/* Streak */}
      <div className="stat-row">
        <div>
          <StreakIcon />
          <span>Streak</span>
        </div>
        <span>{stats.streak}</span>
      </div>

      {/* Rating */}
      <div className="stat-row">
        <div>
          <RatingIcon />
          <span>Rating</span>
        </div>
        <span>{stats.rating.toLocaleString()}</span>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${stats.accuracy}%` }}
          />
        </div>
        <div className="labels">
          <span>Accuracy: {stats.accuracy}%</span>
          <span>Avg. Time: {formatTime(averageTime)}</span>
        </div>
      </div>
    </div>
  )
}
```

**Props:**
- `stats` (object): Session statistics
  - `solved` (number): Puzzles solved
  - `streak` (number): Current winning streak
  - `rating` (number): Current rating (formatted with commas)
  - `accuracy` (number): Success percentage
- `averageTime` (number): Average time per puzzle (seconds)

**Features:**
- Displays 3 main stats with icons
- Progress bar for accuracy
- Average time display
- Number formatting (commas for rating)

**Styling:**
- Container: 402px × 335px
- Icons: Custom SVG with different colors
  - Solved: Green (#32AE60)
  - Streak: Dark (#1A1D1F)
  - Rating: Orange (#F04D1A)
- Progress bar: Purple (#6366F1)

---

### `MoveHistory.jsx`
**Purpose:** Display list of moves played

**What it does:**
```javascript
const MoveHistory = ({ moves, currentMoveIndex }) => {
  // Format moves: "1. e4", "1... e5", "2. Nf3", etc.
  const formattedMoves = moves.map((move, index) => {
    const moveNumber = Math.floor(index / 2) + 1
    const isWhiteMove = index % 2 === 0
    return {
      display: isWhiteMove
        ? `${moveNumber}. ${move.san}`
        : `${moveNumber}... ${move.san}`,
      san: move.san,
      index: index,
      isWhiteMove: isWhiteMove,
      moveNumber: moveNumber
    }
  })

  // Calculate next move number for "Your turn"
  const nextMoveNumber = Math.floor(moves.length / 2) + 1
  const isNextWhiteMove = moves.length % 2 === 0

  return (
    <div className="move-history">
      <h3>Move History</h3>

      <div className="move-list">
        {formattedMoves.length === 0 ? (
          <p>No moves yet</p>
        ) : (
          <>
            {formattedMoves.map((move, index) => (
              <div
                key={index}
                className={`move-item ${
                  move.index === currentMoveIndex ? 'current' : ''
                }`}
              >
                <div className="move-notation">{move.display}</div>
                <div className="move-label">
                  {move.index === currentMoveIndex
                    ? 'Current'
                    : move.isWhiteMove ? 'White' : 'Black'
                  }
                </div>
              </div>
            ))}

            {/* Your turn indicator */}
            <div className="move-item">
              <div className="move-notation">
                {isNextWhiteMove
                  ? `${nextMoveNumber}. ...`
                  : `${nextMoveNumber}... ...`
                }
              </div>
              <div className="move-label">Your turn</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
```

**Props:**
- `moves` (array): Array of move objects with `san` notation
- `currentMoveIndex` (number): Index of current move (highlighted)

**Features:**
- Formats moves in chess notation
- Alternates move numbers for white/black
- Highlights current move
- Shows "Your turn" indicator
- Scrollable list

**Move Format Examples:**
- White's first move: "1. e4"
- Black's first move: "1... e5"
- White's second move: "2. Nf3"

**Styling:**
- Container: 402px × 441px
- Each move: 357px × 55px
- Current move: Blue background (#EEF2FF) with blue border
- Font: Helvetica for moves, Inter Display for labels

---

### `Timer.jsx`
**Purpose:** Display elapsed time

**What it does:**
```javascript
const Timer = ({ time }) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <div className="timer">
      <ClockIcon />
      <span>
        {minutes.toString().padStart(2, '0')}
        :
        {seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )
}
```

**Props:**
- `time` (number): Elapsed time in seconds

**Format:**
- Shows MM:SS format
- Zero-padded (e.g., "02:05" not "2:5")
- Includes clock icon

**Note:** This is now mostly handled directly in PuzzlePlayer.jsx

---

### `ActionButtons.jsx`
**Purpose:** Game action buttons (Hint, Solution, Analysis)

**What it does:**
```javascript
const ActionButtons = ({
  onHint,
  onSolution,
  onAnalysis,
  disabled
}) => {
  return (
    <div className="action-buttons">
      <button onClick={onHint} disabled={disabled}>
        <LightbulbIcon />
        Get a Hint
      </button>

      <button onClick={onSolution} disabled={disabled}>
        <EyeIcon />
        Solution
      </button>

      <button onClick={onAnalysis} disabled={disabled}>
        <BookIcon />
        Analysis
      </button>
    </div>
  )
}
```

**Props:**
- `onHint` (function): Hint button handler
- `onSolution` (function): Solution button handler
- `onAnalysis` (function): Analysis button handler
- `disabled` (boolean): Disable all buttons

**Note:** This functionality is now integrated into PuzzlePlayer.jsx

---

## 👨‍💼 Admin Components (`src/components/Admin/`)

### `Admin.jsx`
**Purpose:** Admin panel container

**What it does:**
```javascript
const Admin = () => {
  const [puzzles, setPuzzles] = useState([])
  const [editingPuzzle, setEditingPuzzle] = useState(null)

  const handleAddPuzzle = (newPuzzle) => {
    setPuzzles([...puzzles, newPuzzle])
  }

  const handleEditPuzzle = (puzzle) => {
    setEditingPuzzle(puzzle)
  }

  const handleDeletePuzzle = (id) => {
    setPuzzles(puzzles.filter(p => p.id !== id))
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <PuzzleForm
        onSubmit={handleAddPuzzle}
        editingPuzzle={editingPuzzle}
      />

      <PuzzleList
        puzzles={puzzles}
        onEdit={handleEditPuzzle}
        onDelete={handleDeletePuzzle}
      />
    </div>
  )
}
```

**Features:**
- Add new puzzles
- Edit existing puzzles
- Delete puzzles
- View all puzzles

---

### `PuzzleForm.jsx`
**Purpose:** Form to add/edit puzzles

**What it does:**
```javascript
const PuzzleForm = ({ onSubmit, editingPuzzle }) => {
  const [formData, setFormData] = useState({
    fen: '',
    solution: [],
    playerColor: 'white',
    difficulty: 1200,
    title: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      id: editingPuzzle?.id || Date.now(),
      ...formData
    })
    setFormData({
      fen: '',
      solution: [],
      playerColor: 'white',
      difficulty: 1200,
      title: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="FEN position"
        value={formData.fen}
        onChange={e => setFormData({...formData, fen: e.target.value})}
      />

      <input
        type="text"
        placeholder="Solution (comma-separated moves)"
        value={formData.solution.join(',')}
        onChange={e => setFormData({
          ...formData,
          solution: e.target.value.split(',').map(m => m.trim())
        })}
      />

      <select
        value={formData.playerColor}
        onChange={e => setFormData({...formData, playerColor: e.target.value})}
      >
        <option value="white">White</option>
        <option value="black">Black</option>
      </select>

      <input
        type="number"
        placeholder="Difficulty rating"
        value={formData.difficulty}
        onChange={e => setFormData({...formData, difficulty: Number(e.target.value)})}
      />

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({...formData, title: e.target.value})}
      />

      <button type="submit">
        {editingPuzzle ? 'Update' : 'Add'} Puzzle
      </button>
    </form>
  )
}
```

**Props:**
- `onSubmit` (function): Called with form data when submitted
- `editingPuzzle` (object): Puzzle being edited (null for new puzzle)

**Form Fields:**
- `fen`: Chess position in FEN notation
- `solution`: Array of moves in chess notation
- `playerColor`: 'white' or 'black'
- `difficulty`: Rating (e.g., 1200, 1500, 1800)
- `title`: Puzzle title/description

---

### `PuzzleList.jsx`
**Purpose:** Display list of all puzzles

**What it does:**
```javascript
const PuzzleList = ({ puzzles, onEdit, onDelete }) => {
  return (
    <div className="puzzle-list">
      <h2>Puzzles ({puzzles.length})</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {puzzles.map(puzzle => (
            <tr key={puzzle.id}>
              <td>{puzzle.id}</td>
              <td>{puzzle.title}</td>
              <td>{puzzle.difficulty}</td>
              <td>{puzzle.playerColor}</td>
              <td>
                <button onClick={() => onEdit(puzzle)}>Edit</button>
                <button onClick={() => onDelete(puzzle.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

**Props:**
- `puzzles` (array): List of all puzzles
- `onEdit` (function): Called when edit button clicked
- `onDelete` (function): Called when delete button clicked

---

## 🪝 Custom Hooks (`src/hooks/`)

### `useChessGame.js`
**Purpose:** Manages chess game state and logic

**What it does:**
```javascript
import { Chess } from 'chess.js'
import { useState, useCallback, useEffect } from 'react'

export const useChessGame = (initialFen = 'start') => {
  const [chess] = useState(new Chess())
  const [fen, setFen] = useState('')
  const [moveHistory, setMoveHistory] = useState([])
  const [currentTurn, setCurrentTurn] = useState('w')
  const [lastMove, setLastMove] = useState(null)

  // Initialize game
  useEffect(() => {
    if (initialFen === 'start') {
      chess.reset()
    } else {
      chess.load(initialFen)
    }
    updateState()
  }, [initialFen])

  // Update all state from chess instance
  const updateState = useCallback(() => {
    setFen(chess.fen())
    setMoveHistory(chess.history({ verbose: true }))
    setCurrentTurn(chess.turn())
  }, [chess])

  // Make a move
  const move = useCallback((moveData) => {
    try {
      const result = chess.move(moveData)
      if (result) {
        setLastMove({ from: result.from, to: result.to })
        updateState()
        return result
      }
      return null
    } catch (e) {
      return null
    }
  }, [chess, updateState])

  // Reset game
  const resetGame = useCallback((fen = 'start') => {
    if (fen === 'start') {
      chess.reset()
    } else {
      chess.load(fen)
    }
    setLastMove(null)
    updateState()
  }, [chess, updateState])

  // Get legal moves for a square
  const getLegalMoves = useCallback((square = null) => {
    if (square) {
      return chess.moves({ square, verbose: true })
    }
    return chess.moves({ verbose: true })
  }, [chess])

  return {
    chess,
    fen,
    moveHistory,
    currentTurn,
    lastMove,
    move,
    resetGame,
    getLegalMoves
  }
}
```

**Returns:**
- `chess`: Chess.js instance
- `fen`: Current position as FEN string
- `moveHistory`: Array of all moves made
- `currentTurn`: 'w' or 'b' (whose turn it is)
- `lastMove`: {from, to} of last move
- `move(moveData)`: Function to make a move
- `resetGame(fen)`: Function to reset/load position
- `getLegalMoves(square)`: Get legal moves

**Use Case:**
```javascript
const {
  fen,
  currentTurn,
  move,
  resetGame
} = useChessGame('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

// Make a move
const result = move({ from: 'e2', to: 'e4' })

// Reset to starting position
resetGame('start')
```

---

### `usePuzzleManager.js`
**Purpose:** Manages puzzle collection and navigation

**What it does:**
```javascript
import { useState, useEffect } from 'react'
import { puzzleStorage } from '../utils/puzzleStorage'
import samplePuzzles from '../data/samplePuzzles'

export const usePuzzleManager = () => {
  const [puzzles, setPuzzles] = useState([])
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [sessionStats, setSessionStats] = useState({
    solved: 0,
    streak: 0,
    rating: 1200,
    accuracy: 0,
    averageTime: 0,
    totalAttempts: 0
  })

  // Load puzzles on mount
  useEffect(() => {
    const stored = puzzleStorage.getPuzzles()
    if (stored.length > 0) {
      setPuzzles(stored)
    } else {
      setPuzzles(samplePuzzles)
      puzzleStorage.savePuzzles(samplePuzzles)
    }
  }, [])

  // Get current puzzle
  const currentPuzzle = puzzles[currentPuzzleIndex]
  const totalPuzzles = puzzles.length

  // Navigation
  const nextPuzzle = () => {
    setCurrentPuzzleIndex(prev =>
      prev < puzzles.length - 1 ? prev + 1 : prev
    )
  }

  const previousPuzzle = () => {
    setCurrentPuzzleIndex(prev =>
      prev > 0 ? prev - 1 : prev
    )
  }

  // Complete puzzle
  const completePuzzle = (success, time) => {
    setSessionStats(prev => ({
      ...prev,
      solved: success ? prev.solved + 1 : prev.solved,
      streak: success ? prev.streak + 1 : 0,
      totalAttempts: prev.totalAttempts + 1,
      averageTime: ((prev.averageTime * prev.totalAttempts) + time) / (prev.totalAttempts + 1)
    }))
  }

  // Update session stats
  const updateSessionStats = () => {
    const accuracy = sessionStats.totalAttempts > 0
      ? Math.round((sessionStats.solved / sessionStats.totalAttempts) * 100)
      : 0

    setSessionStats(prev => ({
      ...prev,
      accuracy
    }))
  }

  return {
    currentPuzzle,
    currentPuzzleIndex,
    totalPuzzles,
    sessionStats,
    nextPuzzle,
    previousPuzzle,
    completePuzzle,
    updateSessionStats
  }
}
```

**Returns:**
- `currentPuzzle`: Current puzzle object
- `currentPuzzleIndex`: Index of current puzzle
- `totalPuzzles`: Total number of puzzles
- `sessionStats`: Session statistics object
- `nextPuzzle()`: Navigate to next puzzle
- `previousPuzzle()`: Navigate to previous puzzle
- `completePuzzle(success, time)`: Mark puzzle complete
- `updateSessionStats()`: Recalculate stats

---

### `useTimer.js`
**Purpose:** Timer functionality for tracking puzzle time

**What it does:**
```javascript
import { useState, useEffect, useCallback } from 'react'

export const useTimer = () => {
  const [time, setTime] = useState(0) // seconds
  const [isRunning, setIsRunning] = useState(false)

  // Increment timer
  useEffect(() => {
    let interval = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  // Start timer
  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  // Stop timer
  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  // Reset timer to 0
  const reset = useCallback(() => {
    setTime(0)
    setIsRunning(false)
  }, [])

  // Restart (reset + start)
  const restart = useCallback(() => {
    setTime(0)
    setIsRunning(true)
  }, [])

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
    restart
  }
}
```

**Returns:**
- `time` (number): Elapsed time in seconds
- `isRunning` (boolean): Whether timer is running
- `start()`: Start timer
- `stop()`: Stop timer (keeps time)
- `reset()`: Reset to 0 and stop
- `restart()`: Reset to 0 and start

**Use Case:**
```javascript
const { time, start, stop, reset } = useTimer()

// Start timer when puzzle begins
start()

// Stop timer when puzzle completes
stop()

// Display time
const minutes = Math.floor(time / 60)
const seconds = time % 60
console.log(`${minutes}:${seconds}`)
```

---

### `useLocalStorage.js`
**Purpose:** Persist state to browser localStorage

**What it does:**
```javascript
import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided default
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  // Update localStorage when value changes
  const setValue = (value) => {
    try {
      // Allow value to be a function (like useState)
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value

      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}
```

**Parameters:**
- `key` (string): localStorage key
- `initialValue`: Default value if key doesn't exist

**Returns:**
- `[storedValue, setValue]`: Like useState, but persisted

**Use Case:**
```javascript
// Save user preferences
const [theme, setTheme] = useLocalStorage('theme', 'light')

// Change theme (automatically saves to localStorage)
setTheme('dark')

// On page reload, theme will be 'dark'

// Save puzzles
const [puzzles, setPuzzles] = useLocalStorage('puzzles', samplePuzzles)
```

---

## 🛠️ Utils (`src/utils/`)

### `chessHelper.js`
**Purpose:** Chess-related utility functions

**What it does:**
```javascript
// Format time in MM:SS
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Check if two moves match
export const movesMatch = (move1, move2) => {
  // Handle different move formats
  if (typeof move1 === 'object' && typeof move2 === 'object') {
    return move1.from === move2.from &&
           move1.to === move2.to &&
           move1.promotion === move2.promotion
  }

  if (typeof move1 === 'string' && typeof move2 === 'string') {
    return move1 === move2
  }

  // Compare object to string (SAN notation)
  if (typeof move1 === 'object') {
    return move1.san === move2
  }
  if (typeof move2 === 'object') {
    return move2.san === move1
  }

  return false
}

// Parse move string to object
export const parseMove = (moveString) => {
  // Parse long notation (e2e4) to {from: 'e2', to: 'e4'}
  if (moveString.length === 4) {
    return {
      from: moveString.substring(0, 2),
      to: moveString.substring(2, 4)
    }
  }

  // Parse with promotion (e7e8q)
  if (moveString.length === 5) {
    return {
      from: moveString.substring(0, 2),
      to: moveString.substring(2, 4),
      promotion: moveString[4]
    }
  }

  return null
}

// Get piece symbol for display
export const getPieceSymbol = (piece) => {
  const symbols = {
    'p': '♟', 'n': '♞', 'b': '♝',
    'r': '♜', 'q': '♛', 'k': '♚',
    'P': '♙', 'N': '♘', 'B': '♗',
    'R': '♖', 'Q': '♕', 'K': '♔'
  }
  return symbols[piece] || piece
}
```

**Functions:**
- `formatTime(seconds)`: Format seconds to "MM:SS"
- `movesMatch(move1, move2)`: Check if two moves are the same
- `parseMove(moveString)`: Parse move notation to object
- `getPieceSymbol(piece)`: Get Unicode chess symbol

---

### `puzzleStorage.js`
**Purpose:** Manage puzzle data in localStorage

**What it does:**
```javascript
const STORAGE_KEY = 'chess_puzzles'

export const puzzleStorage = {
  // Get all puzzles
  getPuzzles: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading puzzles:', error)
      return []
    }
  },

  // Save puzzles
  savePuzzles: (puzzles) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(puzzles))
      return true
    } catch (error) {
      console.error('Error saving puzzles:', error)
      return false
    }
  },

  // Add single puzzle
  addPuzzle: (puzzle) => {
    const puzzles = puzzleStorage.getPuzzles()
    puzzles.push(puzzle)
    return puzzleStorage.savePuzzles(puzzles)
  },

  // Update puzzle
  updatePuzzle: (id, updates) => {
    const puzzles = puzzleStorage.getPuzzles()
    const index = puzzles.findIndex(p => p.id === id)
    if (index !== -1) {
      puzzles[index] = { ...puzzles[index], ...updates }
      return puzzleStorage.savePuzzles(puzzles)
    }
    return false
  },

  // Delete puzzle
  deletePuzzle: (id) => {
    const puzzles = puzzleStorage.getPuzzles()
    const filtered = puzzles.filter(p => p.id !== id)
    return puzzleStorage.savePuzzles(filtered)
  },

  // Clear all puzzles
  clearPuzzles: () => {
    localStorage.removeItem(STORAGE_KEY)
  }
}
```

**Methods:**
- `getPuzzles()`: Get all puzzles from localStorage
- `savePuzzles(puzzles)`: Save puzzle array
- `addPuzzle(puzzle)`: Add single puzzle
- `updatePuzzle(id, updates)`: Update puzzle by ID
- `deletePuzzle(id)`: Delete puzzle by ID
- `clearPuzzles()`: Remove all puzzles

---

## 📊 Data (`src/data/`)

### `samplePuzzles.js`
**Purpose:** Default puzzle data for testing

**What it does:**
```javascript
export const samplePuzzles = [
  {
    id: 1,
    title: "Checkmate in 2",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
    solution: ["Qxf7+", "Ke7", "Qf5#"],
    playerColor: "white",
    difficulty: 1200,
    tags: ["checkmate", "beginner"]
  },
  {
    id: 2,
    title: "Win Material",
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    solution: ["Nxe4", "Bxf7+", "Kxf7"],
    playerColor: "black",
    difficulty: 1400,
    tags: ["tactics", "material"]
  }
  // ... more puzzles
]

export default samplePuzzles
```

**Puzzle Object Structure:**
- `id` (number): Unique identifier
- `title` (string): Puzzle title
- `fen` (string): Starting position
- `solution` (array): Array of moves (alternating player/opponent)
- `playerColor` ('white' | 'black'): Which side user plays
- `difficulty` (number): Rating (1200-2500)
- `tags` (array): Categories/themes

---

## 🎨 Styling

### Tailwind CSS Classes Used

**Layout:**
- `flex`, `grid` - Flexbox and grid layouts
- `absolute`, `fixed`, `relative` - Positioning
- `w-[402px]`, `h-[72px]` - Exact dimensions
- `space-y-4`, `gap-2` - Spacing
- `px-4`, `py-2` - Padding
- `ml-60` - Margin

**Colors:**
- `bg-white`, `bg-[#F7F8FA]` - Backgrounds
- `text-[#1A1D1F]`, `text-gray-700` - Text colors
- `border-[#EFEFEF]` - Border colors

**Typography:**
- `text-sm`, `text-lg`, `text-xl` - Font sizes
- `font-semibold`, `font-bold` - Font weights
- `leading-6`, `leading-8` - Line heights
- `tracking-[-0.01em]` - Letter spacing

**Custom Styles (inline):**
```javascript
style={{
  fontFamily: 'Inter Display',
  fontSize: '18px',
  lineHeight: '18px',
  fontFeatureSettings: "'ss01' on",
  border: '1.5px solid rgba(123, 123, 123, 0.1)'
}}
```

---

## 🔄 Data Flow

### How Data Moves Through the App

```
1. App Startup:
   main.jsx → App.jsx → PuzzlePlayer.jsx

2. Load Puzzles:
   usePuzzleManager → puzzleStorage.getPuzzles()
   → samplePuzzles (if no stored puzzles)

3. Initialize Game:
   PuzzlePlayer → useChessGame(puzzle.fen)
   → Chess.js instance created
   → Board displays position

4. Player Makes Move:
   ChessBoard (user drags piece)
   → onPieceDrop(from, to)
   → PuzzlePlayer.handlePieceDrop()
   → useChessGame.move()
   → Chess.js validates move
   → Compare with solution
   → Update UI (feedback, highlight)

5. Auto-play Opponent Move:
   PuzzlePlayer useEffect watches currentTurn
   → Not player's turn
   → Delay 500ms
   → useChessGame.move(solution[index])
   → Board updates

6. Puzzle Complete:
   All solution moves made
   → PuzzlePlayer.handlePuzzleComplete()
   → useTimer.stop()
   → usePuzzleManager.completePuzzle()
   → Update sessionStats
   → Show modal

7. Stats Update:
   sessionStats changes
   → SessionStats component re-renders
   → Display updated numbers
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Moves Not Registering

**Symptom:** Pieces snap back when dropped

**Causes:**
- `boardDisabled = true`
- `puzzleStatus !== 'playing'`
- Illegal move (not in chess rules)
- Wrong turn (opponent's turn)

**Solution:**
```javascript
// Check in handlePieceDrop:
console.log('Board disabled:', boardDisabled)
console.log('Puzzle status:', puzzleStatus)
console.log('Is player turn:', isPlayerTurn)
```

---

### Issue 2: Opponent Not Moving

**Symptom:** Game stuck after player move

**Causes:**
- `currentSolutionIndex` out of sync
- `isValidatingMove = true` (blocks auto-play)
- Solution array empty or malformed

**Solution:**
```javascript
// Check solution array:
console.log('Solution:', currentPuzzle.solution)
console.log('Current index:', currentSolutionIndex)
console.log('Next move:', currentPuzzle.solution[currentSolutionIndex])
```

---

### Issue 3: Stats Not Updating

**Symptom:** Solved count doesn't increase

**Causes:**
- `updateSessionStats()` not called
- `completePuzzle()` called with wrong params
- State not persisting

**Solution:**
```javascript
// Add console.logs in completePuzzle:
const completePuzzle = (success, time) => {
  console.log('Completing puzzle:', { success, time })
  setSessionStats(prev => {
    const newStats = {
      ...prev,
      solved: success ? prev.solved + 1 : prev.solved
    }
    console.log('New stats:', newStats)
    return newStats
  })
}
```

---

### Issue 4: Puzzle Won't Load

**Symptom:** Blank board or error

**Causes:**
- Invalid FEN string
- `currentPuzzle` is null/undefined
- Missing puzzle properties

**Solution:**
```javascript
// Add safety checks:
if (!currentPuzzle) {
  return <div>No puzzles available</div>
}

// Validate FEN before loading:
try {
  const testChess = new Chess(currentPuzzle.fen)
} catch (e) {
  console.error('Invalid FEN:', currentPuzzle.fen)
}
```

---

## 🚀 Adding New Features

### Example: Add a "Skip Puzzle" Button

**Step 1:** Add button to PuzzlePlayer.jsx
```javascript
<button onClick={handleSkipPuzzle}>
  Skip Puzzle
</button>
```

**Step 2:** Add handler function
```javascript
const handleSkipPuzzle = () => {
  // Mark as skipped (not failed)
  updateSessionStats()
  nextPuzzle()
}
```

**Step 3:** Update session stats to track skips
```javascript
const [sessionStats, setSessionStats] = useState({
  solved: 0,
  skipped: 0, // NEW
  streak: 0,
  // ...
})
```

---

### Example: Add Sound Effects

**Step 1:** Add sound files to `public/sounds/`
```
public/
  sounds/
    move.mp3
    correct.mp3
    wrong.mp3
```

**Step 2:** Create sound utility
```javascript
// src/utils/sounds.js
export const playSound = (soundName) => {
  const audio = new Audio(`/sounds/${soundName}.mp3`)
  audio.play()
}
```

**Step 3:** Use in PuzzlePlayer
```javascript
import { playSound } from '../utils/sounds'

// In handlePieceDrop:
if (movesMatch(result, expectedMove)) {
  playSound('correct') // NEW
  setFeedback({ type: 'success', message: 'Correct move!' })
} else {
  playSound('wrong') // NEW
  setFeedback({ type: 'error', message: 'Incorrect move!' })
}
```

---

## 📚 Key Concepts Summary

### React Concepts Used

1. **Components**: Reusable UI pieces
2. **Props**: Pass data to child components
3. **State**: Component memory (useState)
4. **Effects**: Side effects (useEffect)
5. **Custom Hooks**: Reusable logic
6. **Refs**: Direct DOM access (useRef)
7. **Context**: Global state (if used)

### Chess Concepts

1. **FEN**: Position notation (string)
2. **SAN**: Move notation (e4, Nf3, etc.)
3. **Long Notation**: e2e4 format
4. **Board Orientation**: White/black perspective
5. **Legal Moves**: Valid moves in position
6. **Turn**: Whose move it is (w/b)
7. **Check/Checkmate**: Win conditions

### State Management Flow

```
User Action
  ↓
Event Handler (onClick, onDrop)
  ↓
Update State (setState)
  ↓
React Re-renders
  ↓
UI Updates
```

---

## 🎓 Learning Path

### Beginner Level
1. Understand file structure
2. Trace data flow from main.jsx → App.jsx
3. Read common components (Button, Modal)
4. Understand props and state basics

### Intermediate Level
1. Study PuzzlePlayer.jsx logic
2. Understand useEffect dependencies
3. Learn custom hooks (useChessGame, useTimer)
4. Modify styling and add features

### Advanced Level
1. Refactor state management (add Zustand/Redux)
2. Add multiplayer with WebSockets
3. Implement puzzle generation AI
4. Add animation and advanced UI features

---

**Last Updated:** 2025-01-21

