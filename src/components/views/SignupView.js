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
  Divider,
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

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Username must be 6–30 characters";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Username must not contain spaces";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Password must be at least 8 characters";
    }

    setErrors(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <Stack spacing={1.5} alignItems="center">
            <Typography
              variant="h4"
              fontWeight={800}
              letterSpacing="-0.5px"
            >
              Create your account
            </Typography>
  
            <Typography variant="body2" color="text.secondary">
              Join ChatLog today
            </Typography>
          </Stack>
  
          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              required
              name="username"
              label="Username"
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  height: 52,
                },
              }}
            />
  
            <TextField
              fullWidth
              required
              name="email"
              label="Email"
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  height: 52,
                },
              }}
            />
  
            <TextField
              fullWidth
              required
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  height: 52,
                },
              }}
            />
  
            {serverError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {serverError}
              </Alert>
            )}
  
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{
                py: 1.4,
                borderRadius: 999,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Sign up
            </Button>
          </Box>
  
          {/* Footer */}
          <Stack spacing={1.5} alignItems="center" sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontWeight: 600,
                  color: "inherit",
                }}
              >
                Log in
              </Link>
            </Typography>
  
            <Copyright />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
  
};

export default SignupView;
