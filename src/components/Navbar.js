import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(255,255,255,0.65)", // softer glass
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 }, py: 1 }}>
        {/* Left Section - Logo */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {isMobile && (
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ color: "text.secondary" }}
            >
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
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { opacity: 0.85 },
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
            sx={{ width: "32%", mx: 4 }}
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
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(12px)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0,0,0,0.08)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.light,
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Right Section */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {!isMobile &&
            navItems.map((item) => (
              <IconButton
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "text.secondary",
                  borderRadius: 3,
                  p: 1.2,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: "rgba(255,255,255,0.4)",
                    transform: "scale(1.12)",
                  },
                }}
              >
                {item.icon}
              </IconButton>
            ))}

          {isMobile && (
            <IconButton sx={{ color: "text.secondary" }} onClick={() => navigate("/search")}>
              <SearchIcon />
            </IconButton>
          )}

          {user ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  p: 0,
                  ml: 1,
                  borderRadius: "50%",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.25s ease",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <UserAvatar
                  width={38}
                  height={38}
                  username={user.username}
                  sx={{
                    border: `2px solid ${theme.palette.primary.main}`,
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
                    minWidth: 220,
                    borderRadius: 3,
                    backdropFilter: "blur(14px) saturate(200%)",
                    backgroundColor: "rgba(255,255,255,0.85)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.05)",
                      },
                    }}
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
                  borderRadius: 3,
                  px: 2,
                  color: "text.secondary",
                  borderColor: "rgba(0,0,0,0.2)",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  },
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
                  borderRadius: 3,
                  px: 2,
                  boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
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
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(10px)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0,0,0,0.1)",
                },
              },
            }}
          />
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
