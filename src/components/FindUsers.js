import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
  Button,
  Box,
  Tooltip,
  useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlinePlus } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import UserEntry from "./UserEntry";

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomUsers({ size: 5 });
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card sx={{ p: 2, borderRadius: 3, boxShadow: theme.shadows[2] }}>
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between" alignItems="center">
          <HorizontalStack alignItems="center" spacing={1}>
            <AiOutlineUser size={20} />
            <Typography variant="h6" fontWeight="bold">
              Friends
            </Typography>
          </HorizontalStack>
          <Tooltip title="Refresh suggestions">
            <IconButton
              onClick={fetchUsers}
              disabled={loading}
              sx={{
                p: 1,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  transform: "rotate(360deg)",
                  transition: "transform 0.5s ease"
                }
              }}
            >
              <MdRefresh />
            </IconButton>
          </Tooltip>
        </HorizontalStack>

        <Divider sx={{ my: 1 }} />

        {loading ? (
          <Loading />
        ) : error ? (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography color="error">{error}</Typography>
            <Button
              variant="outlined"
              onClick={fetchUsers}
              sx={{ mt: 1 }}
              startIcon={<MdRefresh />}
            >
              Retry
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            {users?.map((user) => (
              <UserEntry 
                username={user.username} 
                key={user.username}
                avatar={user.avatar}
              />
            ))}
            {/* <Button
              variant="contained"
              startIcon={<AiOutlinePlus />}
              component={Link}
              to="/discover"
              sx={{
                mt: 1,
                borderRadius: 5,
                textTransform: "none",
                fontWeight: "bold"
              }}
            >
              Discover More
            </Button> */}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default FindUsers;