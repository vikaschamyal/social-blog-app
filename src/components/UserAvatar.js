import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';

const UserAvatar = ({ 
  username, 
  size = 60, 
  variant = "circular",
  showTooltip = true,
  tooltipTitle = "",
  onClick
}) => {
  const avatarStyles = {
    height: size,
    width: size,
    backgroundColor: getRandomColor(username),
    cursor: onClick ? "pointer" : "default",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: onClick ? "scale(1.1)" : "none",
      boxShadow: onClick ? "0 0 10px rgba(0,0,0,0.2)" : "none"
    }
  };

  const avatar = (
    <Avatar
      variant={variant}
      sx={avatarStyles}
      src={`https://robohash.org/${username}?set=set4`} // Using set4 for more varied avatars
      alt={username}
      onClick={onClick}
    />
  );

  return showTooltip ? (
    <Tooltip title={tooltipTitle || `@${username}`} arrow>
      {avatar}
    </Tooltip>
  ) : (
    avatar
  );
};

// Helper function to generate consistent color from username
function getRandomColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 60%)`;
}

UserAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  size: PropTypes.number,
  variant: PropTypes.oneOf(["circular", "rounded", "square"]),
  showTooltip: PropTypes.bool,
  tooltipTitle: PropTypes.string,
  onClick: PropTypes.func
};

export default UserAvatar;