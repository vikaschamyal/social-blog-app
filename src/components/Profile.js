import { useTheme } from "@emotion/react";
import {
  Avatar,
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

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        mb: 4,
        backgroundColor: "background.paper",
      }}
    >
      {user ? (
        <>
          {/* Banner Section */}
          <Box
            sx={{
              height: 140,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          />

          <Stack alignItems="center" spacing={2} sx={{ p: 3, mt: -9 }}>
            {/* Avatar */}
            <UserAvatar
              width={120}
              height={120}
              username={user.username}
              sx={{
                border: "4px solid white",
                boxShadow: 3,
                borderRadius: "50%",
              }}
            />

            {/* Username */}
            <Typography variant="h5" fontWeight="bold">
              {user.username}
            </Typography>

            {/* Bio Section */}
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
                  backgroundColor: "background.default",
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
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                variant="outlined"
                onClick={props.handleEditing}
                sx={{ mt: 2 }}
              >
                {props.editing ? "Cancel" : "Edit bio"}
              </Button>
            )}

            {currentUser && user._id !== currentUser.userId && (
              <Button
                variant="contained"
                size="small"
                onClick={props.handleMessage}
                sx={{ mt: 2, px: 3, borderRadius: 2 }}
              >
                Message
              </Button>
            )}

            {/* Stats Section */}
            <Divider flexItem sx={{ my: 2 }} />
            <HorizontalStack spacing={4}>
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
