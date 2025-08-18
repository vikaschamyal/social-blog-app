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
import UserEntry from "./UserEntry";
import HorizontalStack from "./util/HorizontalStack";

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
    <Card
      sx={{
        p: 2.5,
        borderRadius: 1,
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack spacing={2}>
        {/* Header */}
        <HorizontalStack justifyContent="space-between" alignItems="center">
          <HorizontalStack alignItems="center" spacing={1}>
            <AiOutlineUser size={22} color={theme.palette.primary.main} />
            <Typography variant="h6" fontWeight={600} color="text.primary">
              Suggested Friends
            </Typography>
          </HorizontalStack>

          <Tooltip title="Refresh suggestions">
            <IconButton
              onClick={fetchUsers}
              disabled={loading}
              sx={{
                p: 1,
                transition: "transform 0.4s ease",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  transform: "rotate(180deg)",
                },
              }}
            >
              <MdRefresh size={20} />
            </IconButton>
          </Tooltip>
        </HorizontalStack>

        <Divider />

        {/* Content */}
        {loading ? (
          <Loading />
        ) : error ? (
          <Box
            sx={{
              textAlign: "center",
              py: 3,
              px: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.error.light,
              color: theme.palette.error.contrastText,
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              {error}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={fetchUsers}
              sx={{ mt: 1.5, borderRadius: 20 }}
              startIcon={<MdRefresh />}
            >
              Retry
            </Button>
          </Box>
        ) : (
          <Stack spacing={1.5}>
            {users?.map((user) => (
              <UserEntry
                username={user.username}
                key={user.username}
                avatar={user.avatar}
              />
            ))}

            {/* Discover More CTA */}
            {/* <Button
              variant="outlined"
              startIcon={<AiOutlinePlus />}
              component={Link}
              to="/discover"
              fullWidth
              sx={{
                mt: 1,
                borderRadius: 25,
                textTransform: "none",
                fontWeight: 600,
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
