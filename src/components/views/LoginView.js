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
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
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

    const data = await login(formData);
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
              Sign in to ChatLog
            </Typography>
  
            <Typography variant="body2" color="text.secondary">
              Welcome back 
            </Typography>
          </Stack>
  
          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              required
              name="email"
              label="Email"
              onChange={handleChange}
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
              Sign in
            </Button>
          </Box>
  
          {/* Footer Links */}
          <Stack spacing={1.5} alignItems="center" sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  fontWeight: 600,
                  color: "inherit",
                }}
              >
                Sign up
              </Link>
            </Typography>
  
            <Copyright />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
  
};

export default LoginView;
