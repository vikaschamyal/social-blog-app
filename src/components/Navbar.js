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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Mail as MailIcon,
  SportsEsports as SportsEsportsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Book as BookIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = isLoggedIn();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch);

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
      setShowMobileSearch(false);
      setDrawerOpen(false);
    }
  };

  const navItems = [
    { icon: <HomeIcon />, label: "Home", path: "/" },
    { icon: <BookIcon />, label: "Journal", path: "/journal" },
    { icon: <SportsEsportsIcon />, label: "Games", path: "/games" },
    { icon: <MailIcon />, label: "Messages", path: "/messenger" },
    { icon: <InfoIcon />, label: "About", path: "/about" },
  ];

  const profileMenuItems = [
    { icon: <PersonIcon />, label: "Profile", path: `/users/${user?.username}` },
    { icon: <SettingsIcon />, label: "Settings", path: "/settings" },
    { icon: <LogoutIcon />, label: "Logout", action: handleLogout },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(255,255,255,0.85)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LEFT */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {isMobile && !showMobileSearch && (
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            {!showMobileSearch && (
              <Typography
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <SportsEsportsIcon />
                ChatLog
              </Typography>
            )}
          </Stack>

          {/* SEARCH DESKTOP */}
          {!isMobile && (
            <Box component="form" onSubmit={handleSearchSubmit} sx={{ width: "40%" }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {/* RIGHT */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {!isMobile &&
              navItems.map((item) => {
                if (item.path === "/journal" && !user) return null;
                return (
                  <IconButton
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color:
                        location.pathname === item.path
                          ? theme.palette.primary.main
                          : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </IconButton>
                );
              })}

            {user ? (
              <IconButton onClick={handleMenuOpen}>
                <UserAvatar username={user.username} width={36} height={36} />
              </IconButton>
            ) : (
              <>
                <Button component={Link} to="/login">
                  Login
                </Button>
                <Button component={Link} to="/signup" variant="contained">
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* PROFILE MENU */}
      {user && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {profileMenuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={item.action || (() => navigate(item.path))}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      )}

      {/* MOBILE DRAWER */}
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 260 }}>
          <List>
            {navItems.map((item) => {
              if (item.path === "/journal" && !user) return null;
              return (
                <ListItem
                  button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
