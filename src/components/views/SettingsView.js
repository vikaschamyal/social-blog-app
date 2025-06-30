import {
    Box,
    Typography,
    IconButton,
    Stack,
    Divider,
    List,
    Button,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
  } from "@mui/material";
  import { Link, useNavigate } from "react-router-dom";
  import { AiOutlineArrowLeft } from "react-icons/ai";
  import React from "react";
  import {
    MdDarkMode,
    MdInfo,
    MdEmail,
    MdCode,
    MdHelpOutline,
    MdPerson,
  } from "react-icons/md";
  
  const SettingsView = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = React.useState(false);
  
    const handleBackClick = () => {
      navigate(-1); // Goes back to previous page
    };
  
    return (
      <Box sx={{ p: 3, maxWidth: "md", mx: "auto" }}>
        {/* Navigation Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <IconButton
            onClick={handleBackClick}
            aria-label="back"
            sx={{
              color: "primary.main",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <AiOutlineArrowLeft size={24} />
          </IconButton>
          <Typography variant="h4" component="h1">
            Settings
          </Typography>
        </Stack>
  
        {/* Settings Content */}
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 4,
            backgroundColor: "background.paper",
          }}
        >
         
        
            {/* <ListItem>
              <ListItemIcon>
                <MdDarkMode size={24} />
              </ListItemIcon>
              <ListItemText primary="Dark Mode" />
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="primary"
              />
            </ListItem> */}

        <List>
            <Divider />
  
            {/* About Section */}
            <ListItem button component={Link} to="/settings/about">
              <ListItemIcon>
                <MdInfo size={24} />
              </ListItemIcon>
              <ListItemText primary="About" secondary="Learn about this application" />
            </ListItem>
            <Divider />
  
            {/* Contact Section */}
            <ListItem button component={Link} to="/settings/contact">
              <ListItemIcon>
                <MdEmail size={24} />
              </ListItemIcon>
              <ListItemText primary="Contact Us" secondary="Get in touch with our team" />
            </ListItem>
            <Divider />
  
            {/* Developer Section */}
            <ListItem button component={Link} to="/settings/developer">
              <ListItemIcon>
                <MdCode size={24} />
              </ListItemIcon>
              <ListItemText 
                primary="Developer Info" 
                secondary="About the creator of this app" 
              />
            </ListItem>
            <Divider />
  
            {/* Help & Support */}
            <ListItem button component={Link} to="/settings/help">
              <ListItemIcon>
                <MdHelpOutline size={24} />
              </ListItemIcon>
              <ListItemText primary="Help & Support" secondary="Get assistance" />
            </ListItem>
            <Divider />
  
            {/* User Profile */}
            <ListItem button component={Link} to="/settings/profile">
              <ListItemIcon>
                <MdPerson size={24} />
              </ListItemIcon>
              <ListItemText primary="Your Profile" secondary="View and edit your profile" />
            </ListItem>
          </List>
  
          {/* Back to Home Button */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              component={Link}
              to="/"
              size="large"
              sx={{ px: 4 }}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default SettingsView;