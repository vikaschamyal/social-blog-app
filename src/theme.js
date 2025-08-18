import { createTheme } from "@mui/material";

const professionalTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7C3AED", // Muted violet accent
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#22A39F", // Teal accent
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F4F1EB", // Warm beige-gray background
      paper: "#FFFFFF",  // Soft white cards
    },
    text: {
      primary: "#2C2C2C", // Charcoal for comfy readability
      secondary: "#5C5C5C", // Muted gray
    },
  },
  typography: {
    fontFamily: '"Inter", "Nunito Sans", "Roboto", sans-serif',
    h1: {
      fontSize: "2.4rem",
      fontWeight: 700,
      color: "#1E1E1E",
      letterSpacing: "-0.01em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#2C2C2C",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#5C5C5C",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 12, // Rounded but not too playful
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F1EB",
          scrollbarColor: "#C1BDB6 transparent",
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#C1BDB6",
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E5E1DA",
          borderRadius: 14,
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          transition: "all 0.25s ease",
          background: "#FFFFFF",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
          fontWeight: 600,
          transition: "all 0.25s ease",
        },
        contained: {
          background: "linear-gradient(135deg, #7C3AED, #22A39F)",
          boxShadow: "0 3px 10px rgba(124,58,237,0.25)",
          "&:hover": {
            background: "linear-gradient(135deg, #6D28D9, #1C908D)",
            boxShadow: "0 5px 14px rgba(124,58,237,0.35)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          background: "#FFFFFF",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: "2px solid #F4F1EB",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "&.Mui-selected": {
            backgroundColor: "rgba(124,58,237,0.08)",
            color: "#6D28D9",
          },
        },
      },
    },
  },
});



export default professionalTheme;