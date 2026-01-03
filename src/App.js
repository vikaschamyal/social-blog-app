// App.js
import "@mui/material";
import "react-icons";
import "react-icons/bi";
import "react-icons/md";
import "react-icons/bs";
import "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import theme from "./theme";

import PostView from "./components/views/PostView";
import CreatePostView from "./components/views/CreatePostView";
import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ExploreView from "./components/views/ExploreView";
import PrivateRoute from "./components/PrivateRoute";
import SearchView from "./components/views/SearchView";
import MessengerView from "./components/views/MessengerView";
import GameView from "./components/views/GameView";
import SettingsView from "./components/views/SettingsView";
import AboutSettings from "./components/views/AboutSettings";
import ContactSettings from "./components/views/ContactSettings";
import DeveloperSettings from "./components/views/DeveloperSettings";
import UserProfileSettings from "./components/views/UserProfileSettings";

import JournalView from "./components/views/JournalView";

import Footer from "./components/Footer"; // 👈 import Footer

import { initiateSocketConnection } from "./helpers/socketHelper";

// Wrapper so we can use `useLocation` inside App
function AppContent() {
  const location = useLocation();

  // Hide footer on login & signup
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box flex="1">
        <Routes>
          <Route path="/" element={<ExploreView />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <CreatePostView />
              </PrivateRoute>
            }
          />
          <Route
            path="/messenger"
            element={
              <PrivateRoute>
                <MessengerView />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchView />} />
          <Route path="/users/:id" element={<ProfileView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/about" element={<AboutSettings />} />

          <Route
            path="/games"
            element={
              <PrivateRoute>
                <GameView />
              </PrivateRoute>
            }
          />
          {/* Settings Routes */}
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsView />
              </PrivateRoute>
            }
          />

          <Route
            path="/settings/contact"
            element={
              <PrivateRoute>
                <ContactSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/developer"
            element={
              <PrivateRoute>
                <DeveloperSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/profile"
            element={
              <PrivateRoute>
                <UserProfileSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <PrivateRoute>
                <JournalView />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>

      {/* Footer visible on all pages except login/signup */}
      {!hideFooter && <Footer />}
    </Box>
  );
}

function App() {
  initiateSocketConnection();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
