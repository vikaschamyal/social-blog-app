import {
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
  Divider,
  IconButton,
  CircularProgress,
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
    navigate(-1); // Go back to previous page
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        {/* Header Section */}
        <HorizontalStack justifyContent="space-between" alignItems="center">
          <HorizontalStack spacing={2} alignItems="center">
            <UserAvatar width={45} height={45} username={user.username} />
            <Typography variant="h6" fontWeight="bold">
              Create New Post
            </Typography>
          </HorizontalStack>
          <IconButton onClick={handleCancel} size="small">
            <MdClose size={20} />
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
              placeholder="What's your post about?"
              InputProps={{
                sx: { borderRadius: 2 }
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
              placeholder="Share your thoughts..."
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />

            {serverError && <ErrorAlert error={serverError} />}

            <HorizontalStack justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  px: 3,
                  borderRadius: 2,
                  textTransform: "none",
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
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Publishing..." : "Publish Post"}
              </Button>
            </HorizontalStack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PostEditor;