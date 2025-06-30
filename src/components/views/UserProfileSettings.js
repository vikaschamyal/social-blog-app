import { useTheme } from "@emotion/react";
import { 
  Avatar, 
  Button, 
  Card, 
  Divider, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import Loading from "../Loading"; // Make sure this path is correct

const UserProfileSettings = ({ currentUser }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (currentUser) {
      setUser({
        username: currentUser.username || "User",
        biography: currentUser.biography || "No bio yet",
        email: currentUser.email || "",
        date: currentUser.date || new Date().toISOString(),
        avatar: currentUser.avatar
      });
      setBio(currentUser.biography || "");
    }
  }, [currentUser]);

  const handleSubmit = () => {
    if (!user) return;
    
    const updatedUser = { ...user, biography: bio };
    setUser(updatedUser);
    setEditing(false);
    // Here you would typically make an API call to update the bio
    console.log("Bio updated to:", bio);
  };

  if (!user) {
    return <Loading label="Loading profile" />;
  }

  return (
    <Box sx={{ p: 3, maxWidth: "md", mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Profile
      </Typography>

      <Card sx={{ p: 3 }}>
        <Stack alignItems="center" spacing={2}>
          {/* Avatar */}
          <Box my={1}>
            <Avatar
              sx={{ 
                width: 150, 
                height: 150, 
                fontSize: 60,
                bgcolor: "primary.main" 
              }}
              src={user.avatar}
            >
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>

          {/* Username */}
          <Typography variant="h5">{user.username}</Typography>

          {/* Bio Section */}
          {editing ? (
            <Box sx={{ width: "100%", maxWidth: "500px" }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditing(false);
                    setBio(user.biography);
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          ) : (
            <>
              <Typography textAlign="center" variant="body1">
                <b>Bio: </b>
                {user.biography}
              </Typography>
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                onClick={() => setEditing(true)}
                variant="outlined"
              >
                Edit bio
              </Button>
            </>
          )}

          <Divider sx={{ width: "100%" }} />

          {/* Read-only Info */}
          <Box sx={{ width: "100%" }}>
            <Typography color="text.secondary">
              <b>Email:</b> {user.email}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              <b>Joined:</b> {new Date(user.date).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default UserProfileSettings;