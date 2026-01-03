import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;
const PLAYER_WIDTH = 100; // bigger basket
const PLAYER_HEIGHT = 20;
const OBJECT_SIZE = 30;
const FALL_SPEED = 4;
const SPAWN_INTERVAL = 1200; // spawn faster

const GameView = () => {
  const navigate = useNavigate();
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [objects, setObjects] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameRef = useRef(null);

  // Keyboard movement
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setPlayerX((prev) => Math.max(prev - 20, 0));
      if (e.key === "ArrowRight") setPlayerX((prev) => Math.min(prev + 20, GAME_WIDTH - PLAYER_WIDTH));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Optional: Mouse movement
  useEffect(() => {
    const handleMouse = (e) => {
      if (!gameRef.current) return;
      const rect = gameRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left - PLAYER_WIDTH / 2;
      x = Math.max(0, Math.min(x, GAME_WIDTH - PLAYER_WIDTH));
      setPlayerX(x);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Spawn objects
  useEffect(() => {
    if (gameOver) return;
    const spawn = setInterval(() => {
      const x = Math.random() * (GAME_WIDTH - OBJECT_SIZE);
      const color = ["#e63946", "#f1faee", "#a8dadc", "#457b9d"][Math.floor(Math.random() * 4)];
      setObjects((prev) => [...prev, { x, y: 0, id: Date.now(), color }]);
    }, SPAWN_INTERVAL);
    return () => clearInterval(spawn);
  }, [gameOver]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setObjects((prev) =>
        prev
          .map((obj) => ({ ...obj, y: obj.y + FALL_SPEED }))
          .filter((obj) => {
            const playerTop = GAME_HEIGHT - PLAYER_HEIGHT;
            const playerBottom = GAME_HEIGHT;
            const playerLeft = playerX;
            const playerRight = playerX + PLAYER_WIDTH;

            const objTop = obj.y;
            const objBottom = obj.y + OBJECT_SIZE;
            const objLeft = obj.x;
            const objRight = obj.x + OBJECT_SIZE;

            // Caught
            if (
              objBottom >= playerTop &&
              objTop <= playerBottom &&
              objRight >= playerLeft &&
              objLeft <= playerRight
            ) {
              setScore((s) => s + 1);
              return false;
            }

            // Missed
            if (obj.y > GAME_HEIGHT) {
              setGameOver(true);
              return false;
            }

            return true;
          })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [playerX, gameOver]);

  const restartGame = () => {
    setObjects([]);
    setScore(0);
    setPlayerX(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
    setGameOver(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} aria-label="back" sx={{ color: "primary.main" }}>
          <AiOutlineArrowLeft size={24} />
        </IconButton>
        <Typography variant="h4">Catch the Falling Objects</Typography>
      </Stack>

      {/* Game Area */}
      <Box
        ref={gameRef}
        sx={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          border: "2px solid",
          borderColor: "divider",
          borderRadius: 2,
          mx: "auto",
          position: "relative",
          backgroundColor: "background.paper",
          overflow: "hidden",
        }}
      >
        {/* Player */}
        <Box
          sx={{
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
            backgroundColor: "#2a9d8f",
            position: "absolute",
            bottom: 0,
            left: playerX,
            borderRadius: 2,
          }}
        />

        {/* Falling Objects */}
        {objects.map((obj) => (
          <Box
            key={obj.id}
            sx={{
              width: OBJECT_SIZE,
              height: OBJECT_SIZE,
              backgroundColor: obj.color,
              position: "absolute",
              top: obj.y,
              left: obj.x,
              borderRadius: "50%",
            }}
          />
        ))}

        {gameOver && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "1.2rem",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Game Over!
            </Typography>
            <Typography sx={{ mb: 2 }}>Score: {score}</Typography>
            <Button variant="contained" onClick={restartGame}>
              Restart
            </Button>
          </Box>
        )}
      </Box>

      {/* Score */}
      {!gameOver && (
        <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
          Score: {score}
        </Typography>
      )}

      {/* Back to Home */}
      <Button variant="outlined" onClick={() => navigate("/")} sx={{ mt: 4, display: "block", mx: "auto" }}>
        Back to Home
      </Button>
    </Box>
  );
};

export default GameView;
