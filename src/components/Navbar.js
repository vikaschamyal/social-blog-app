import React, { useState } from 'react'; // Added missing useState import
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  Badge,
  useMediaQuery,
  InputAdornment,
  Box
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // Fixed icon imports
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    handleMenuClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const navItems = [
    { icon: <HomeIcon />, label: "Home", path: "/" },
    { icon: <SportsEsportsIcon />, label: "Games", path: "/games" },
    { icon: <MailIcon />, label: "Messages", path: "/messenger" },
  ];

  const profileMenuItems = [
    { icon: <PersonIcon />, label: "Profile", path: `/users/${user?.username}` },
    { icon: <SettingsIcon />, label: "Settings", path: "/settings" },
    { icon: <LogoutIcon />, label: "Logout", action: handleLogout },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        {/* Left Section - Logo/Brand */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {isMobile && (
            <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <SportsEsportsIcon fontSize="large" />
            ChatLog
          </Typography>
        </Stack>

        {/* Middle Section - Search (Desktop) */}
        {!isMobile && (
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{ width: '30%', mx: 4 }}
          >
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Search posts, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4, bgcolor: 'background.default' }
              }}
            />
          </Box>
        )}

        {/* Right Section - Navigation */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {!isMobile && navItems.map((item) => (
            <IconButton
              key={item.label}
              component={Link}
              to={item.path}
              color="inherit"
              sx={{
                borderRadius: 2,
                '&:hover': { 
                  backgroundColor: theme.palette.action.hover,
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease'
                }
              }}
            >
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </IconButton>
          ))}

          {isMobile && (
            <IconButton color="inherit" onClick={() => navigate('/search')}>
              <SearchIcon />
            </IconButton>
          )}

          {user ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ p: 0, ml: 1 }}
                aria-label="account menu"
              >
                <UserAvatar
                  width={36}
                  height={36}
                  username={user.username}
                  sx={{ 
                    border: `2px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease'
                    }
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: 2,
                    overflow: 'visible',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box px={2} py={1}>
                  <Typography fontWeight="bold">{user.username}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                {profileMenuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={item.action || (() => navigate(item.path))}
                    sx={{ py: 1.5 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {item.icon}
                      <Typography variant="body2">{item.label}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                component={Link}
                to="/login"
                sx={{ 
                  ml: 1,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText'
                  }
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                size="small"
                component={Link}
                to="/signup"
                sx={{ 
                  ml: 1,
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Stack>
      </Toolbar>

      {/* Mobile Search */}
      {isMobile && mobileMenuOpen && (
        <Box px={2} pb={2}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search posts, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 4, bgcolor: 'background.default' }
            }}
          />
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;