import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  Divider,
  Stack,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  // Local video (placed in public/videos/banner.mp4)
  const bgVideo = "/videos/banner.mp4";

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 1, // 16px
        overflow: "hidden",
        mb: 4,
        backgroundColor: "background.paper",
      }}
    >
      {user ? (
        <>
          {/* Banner Section with Local Video */}
          <Box sx={{ position: "relative", height: 160, overflow: "hidden" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "13px", // same as Card radius
              }}
            >
              <source src={bgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
                borderRadius: 2, // same radius overlay
              }}
            />
          </Box>

          {/* Profile Content */}
          <Stack spacing={2} sx={{ p: 3, mt: -8 }}>
            {/* Avatar */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <UserAvatar
                width={120}
                height={120}
                username={user.username}
                sx={{
                  border: "4px solid white",
                  boxShadow: 3,
                  borderRadius: 2, // same radius as Card (instead of circle)
                  zIndex: 2,
                }}
              />
            </Box>

            {/* Username */}
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              sx={{ mt: 1 }}
            >
              {user.username}
            </Typography>

            {/* Bio */}
            {props.editing ? (
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: "center",
                  maxWidth: 400,
                  mx: "auto",
                  backgroundColor: "background.default",
                  borderRadius: 2, // match everything
                }}
              >
                <Typography variant="body1" color="text.primary">
                  {user.biography ? (
                    <>
                      <b>Bio: </b>
                      {user.biography}
                    </>
                  ) : (
                    <i>No bio yet</i>
                  )}
                </Typography>
              </Paper>
            )}

            {/* Action Buttons */}
            {currentUser && user._id === currentUser.userId && (
              <Box textAlign="center">
                <Button
                  startIcon={<AiFillEdit color={iconColor} />}
                  variant="outlined"
                  onClick={props.handleEditing}
                  sx={{ mt: 2 }}
                >
                  {props.editing ? "Cancel" : "Edit bio"}
                </Button>
              </Box>
            )}

            {currentUser && user._id !== currentUser.userId && (
              <Box textAlign="center">
                <Button
                  variant="contained"
                  size="small"
                  onClick={props.handleMessage}
                  sx={{ mt: 2, px: 3, borderRadius: 2 }}
                >
                  Message
                </Button>
              </Box>
            )}

            {/* Stats */}
            <Divider flexItem sx={{ my: 2 }} />
            <HorizontalStack spacing={4} justifyContent="center">
              <Typography color="text.secondary">
                <b>{props.profile.posts.likeCount}</b> Likes
              </Typography>
              <Typography color="text.secondary">
                <b>{props.profile.posts.count}</b> Posts
              </Typography>
            </HorizontalStack>
          </Stack>
        </>
      ) : (
        <Loading label="Loading profile..." />
      )}
    </Card>
  );
};

export default Profile;
