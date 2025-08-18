import {
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  Divider,
  IconButton,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import { MdClose, MdPostAdd } from "react-icons/md";
import { useState } from "react";

const PostEditor = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};
    return errors;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Card
      elevation={4}
      sx={{
        p: 3.5,
        borderRadius: 1,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack spacing={3}>
        {/* Header Section */}
        <HorizontalStack justifyContent="space-between" alignItems="center">
          <HorizontalStack spacing={2} alignItems="center">
            <UserAvatar width={48} height={48} username={user.username} />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Create New Post
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Share your thoughts with the community
              </Typography>
            </Box>
          </HorizontalStack>
          <IconButton
            onClick={handleCancel}
            size="small"
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <MdClose size={22} />
          </IconButton>
        </HorizontalStack>

        <Divider />

        {/* Form Section */}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Post Title"
              variant="outlined"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="Give your post a short catchy title..."
              InputProps={{
                sx: {
                  borderRadius: 2,
                  fontWeight: 500,
                },
              }}
            />

            <TextField
              fullWidth
              label="Post Content"
              variant="outlined"
              multiline
              rows={8}
              name="content"
              value={formData.content}
              onChange={handleChange}
              error={!!errors.content}
              helperText={errors.content}
              placeholder="Write your thoughts, story, or update here..."
              InputProps={{
                sx: {
                  borderRadius: 2,
                  lineHeight: 1.6,
                },
              }}
            />

            {serverError && <ErrorAlert error={serverError} />}

            <HorizontalStack justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <MdPostAdd />
                  )
                }
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 3px 10px rgba(124,58,237,0.25)",
                  "&:hover": {
                    boxShadow: "0 5px 14px rgba(124,58,237,0.35)",
                  },
                }}
              >
                {loading ? "Publishing..." : "Publish Post"}
              </Button>
            </HorizontalStack>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
