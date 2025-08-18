import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate, Link } from "react-router-dom";
import { isLength, isEmail, contains } from "validator";
import Copyright from "../Copyright";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Must not contain spaces";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Must be a valid email address";
    }

    setErrors(errors);
    return errors;
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 8,
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h4" fontWeight="bold">
            ChatLog
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Create your account 🚀
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            required
            name="username"
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            required
            name="email"
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            required
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {serverError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
          >
            Sign Up
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupView;
