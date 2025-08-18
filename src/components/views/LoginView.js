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
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import ErrorAlert from "../ErrorAlert";
import Copyright from "../Copyright";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Logging in with:", formData);

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 10,
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ChatLog
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Welcome back 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Don’t have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            required
            name="email"
            onChange={handleChange}
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
            required
            margin="normal"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
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
            Login
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginView;
