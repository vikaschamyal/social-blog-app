// src/components/views/GameView.jsx
import { Box, Typography, Button, IconButton, Stack, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ x: 0, o: 0, ties: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return squares.includes(null) ? null : 'Tie';
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === 'X') {
        setScore({...score, x: score.x + 1});
      } else if (gameWinner === 'O') {
        setScore({...score, o: score.o + 1});
      } else {
        setScore({...score, ties: score.ties + 1});
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ x: 0, o: 0, ties: 0 });
    resetGame();
  };

  const renderSquare = (i) => {
    return (
      <Button
        variant="outlined"
        onClick={() => handleClick(i)}
        sx={{
          width: '100px',
          height: '100px',
          fontSize: '2rem',
          color: board[i] === 'X' ? 'error.main' : 'success.main',
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'primary.main'
          }
        }}
        disabled={!!winner || !!board[i]}
      >
        {board[i]}
      </Button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return winner === 'Tie' ? 'Game ended in a tie!' : `Winner: ${winner}`;
    }
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {getStatus()}
      </Typography>
      <Grid container spacing={1} sx={{ width: '306px', margin: '0 auto' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Grid item xs={4} key={i}>
            {renderSquare(i)}
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Button variant="contained" onClick={resetGame}>
          New Game
        </Button>
        <Button variant="outlined" onClick={resetScore}>
          Reset Score
        </Button>
      </Stack>
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Score: X - {score.x} | O - {score.o} | Ties - {score.ties}
      </Typography>
    </Box>
  );
};

const GameView = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      p: 3,
      maxWidth: 'md',
      mx: 'auto'
    }}>
      {/* Navigation Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <IconButton 
          onClick={() => navigate(-1)}
          aria-label="back"
          sx={{ 
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <AiOutlineArrowLeft size={24} />
        </IconButton>
        <Typography variant="h4" component="h1">
          Game Center
        </Typography>
      </Stack>

      {/* Game Content */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 4,
        backgroundColor: 'background.paper'
      }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Tic-Tac-Toe
        </Typography>
        
        <TicTacToe />
        
        <Button 
          variant="outlined" 
          component={Link}
          to="/"
          size="large"
          sx={{ mt: 4 }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default GameView;