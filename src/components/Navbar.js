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
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255,255,255,0.8)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2, md: 4 } }}>
          {/* Left Section: Logo & Mobile Menu */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {isMobile && !showMobileSearch && (
              <IconButton onClick={toggleDrawer} sx={{ color: "text.secondary" }}>
                <MenuIcon />
              </IconButton>
            )}
            {!showMobileSearch && (
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
                }}
              >
                <SportsEsportsIcon fontSize="large" />
                ChatLog
              </Typography>
            )}
          </Stack>

          {/* Search Bar - Desktop */}
          {!isMobile && (
            <Box component="form" onSubmit={handleSearchSubmit} sx={{ width: "40%", maxWidth: "500px", mx: 2 }}>
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
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.08)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.light },
                  },
                }}
              />
            </Box>
          )}

          {/* Search Bar - Mobile */}
          {isMobile && showMobileSearch && (
            <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1, display: "flex", alignItems: "center", mx: 1 }}>
              <TextField
                fullWidth
                size="small"
                autoFocus
                variant="outlined"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <IconButton size="small" onClick={() => setSearchQuery("")}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ),
                  sx: { borderRadius: 3, bgcolor: "rgba(255,255,255,0.5)" },
                }}
              />
            </Box>
          )}

          {/* Right Section: Nav Icons / Profile / Auth */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {isMobile && !showMobileSearch && (
              <IconButton onClick={toggleMobileSearch}>
                <SearchIcon sx={{ color: "text.secondary" }} />
              </IconButton>
            )}

            {!isMobile && !showMobileSearch && (
              <>
                {navItems.map((item) => (
                  <IconButton
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? theme.palette.primary.main : "text.secondary",
                      p: 1.2,
                      borderRadius: 2,
                      transition: "0.2s",
                      "&:hover": {
                        color: theme.palette.primary.main,
                        transform: "scale(1.12)",
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                ))}

                {user ? (
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 1 }}>
                    <UserAvatar
                      width={38}
                      height={38}
                      username={user.username}
                      sx={{ border: `2px solid ${theme.palette.primary.main}` }}
                    />
                  </IconButton>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <Button component={Link} to="/login" variant="outlined" size="small">
                      Login
                    </Button>
                    <Button component={Link} to="/signup" variant="contained" size="small">
                      Sign Up
                    </Button>
                  </Stack>
                )}
              </>
            )}

            {isMobile && showMobileSearch && (
              <IconButton onClick={toggleMobileSearch}>
                <CloseIcon sx={{ color: "text.secondary" }} />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      {user && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ elevation: 3, sx: { borderRadius: 2, mt: 1.5, minWidth: 200 } }}
        >
          {profileMenuItems.map((item) => (
            <MenuItem key={item.label} onClick={item.action || (() => navigate(item.path))} sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Menu>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} sx={{ "& .MuiDrawer-paper": { width: { xs: "80%", sm: 350 } } }}>
        <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* <Box component="form" onSubmit={handleSearchSubmit} sx={{ mt: 4, mb: 3 }}>
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
          </Box> */}

          <List sx={{ flexGrow: 1 }}>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.path}
                onClick={toggleDrawer}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  color: location.pathname === item.path ? theme.palette.primary.main : "text.primary",
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: "auto" }}>
            <Divider sx={{ mb: 2 }} />
            <List>
              {user ? (
                profileMenuItems.map((item) => (
                  <ListItem
                    button
                    key={item.label}
                    onClick={() => {
                      item.action ? item.action() : navigate(item.path);
                      toggleDrawer();
                    }}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      "&:hover": { backgroundColor: theme.palette.action.hover },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))
              ) : (
                <>
                  <ListItem button component={Link} to="/login" onClick={toggleDrawer} sx={{ borderRadius: 1, mb: 0.5, "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                    <ListItemText primary="Login" />
                  </ListItem>
                  <ListItem button component={Link} to="/signup" onClick={toggleDrawer} sx={{ borderRadius: 1, "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                    <ListItemText primary="Sign Up" />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
