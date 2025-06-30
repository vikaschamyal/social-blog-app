import { IconButton, Stack, Typography, useTheme, Tooltip, Zoom } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";
import PropTypes from 'prop-types';

const LikeBox = (props) => {
  const { likeCount, onLike, liked: propLiked, disabled } = props;
  const theme = useTheme();
  const [liked, setLiked] = useState(propLiked);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Sync with parent component's liked state
  useEffect(() => {
    setLiked(propLiked);
  }, [propLiked]);

  const handleLike = (e) => {
    e.stopPropagation();
    
    if (disabled) return;
    
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    const newLikedValue = !liked;
    setLiked(newLikedValue);
    setAnimate(true);
    onLike(newLikedValue);
  };

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Tooltip 
        title={liked ? "Unlike" : "Like"} 
        arrow
        TransitionComponent={Zoom}
      >
        <IconButton 
          sx={{ 
            padding: 0.5,
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'transparent'
            }
          }} 
          onClick={handleLike}
          disabled={disabled}
        >
          <IconContext.Provider 
            value={{ 
              color: liked ? theme.palette.primary.main : theme.palette.text.secondary,
              size: '1.2em'
            }}
          >
            <div 
              onAnimationEnd={handleAnimationEnd}
              style={{
                animation: animate ? 'bounce 0.5s' : 'none',
                display: 'flex'
              }}
            >
              {liked ? <AiFillLike /> : <AiOutlineLike />}
            </div>
          </IconContext.Provider>
        </IconButton>
      </Tooltip>
      <Typography 
        variant="body2" 
        color={liked ? theme.palette.primary.main : theme.palette.text.secondary}
        sx={{
          fontWeight: liked ? 600 : 400,
          transition: 'color 0.3s ease, font-weight 0.3s ease'
        }}
      >
        {likeCount}
      </Typography>

      {/* CSS for bounce animation */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.2); }
          60% { transform: scale(0.9); }
        }
      `}</style>
    </Stack>
  );
};

LikeBox.propTypes = {
  likeCount: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  liked: PropTypes.bool,
  disabled: PropTypes.bool
};

LikeBox.defaultProps = {
  liked: false,
  disabled: false
};

export default LikeBox;