import { createTheme } from "@mui/material";

const professionalTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#Black", 
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#Black", 
      contrastText: "#FFFFFF",
    },
    background: {
      default: "Black", 
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C2C2C", // Charcoal
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
      marginBottom: "1.25rem", // spacing balance
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#2C2C2C",
      marginBottom: "1rem",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      marginBottom: "0.75rem",
      color: "#333333",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#Black",
      marginBottom: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },

  shape: {
    borderRadius: 16, // smoother rounded corners
  },

  spacing: 8, // 8px design grid

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#BABABA",
          scrollbarColor: "#008080 transparent",
    
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor:"#1c0f3b",
            
            borderRadius: 8,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E5E1DA",
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          transition: "all 0.25s ease",
          background: "#FFFFFF",
          padding: "1.5rem", // consistent section padding
          marginBottom: "1.5rem", //  spacing between cards
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 22px", // balanced padding
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
          borderRadius: 16,
          background: "#FFFFFF",
          padding: "1.75rem", // slightly more padding for sections
          marginBottom: "1.5rem", // consistent spacing between papers
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          border: "2px solid #F4F1EB",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          width: 44,
          height: 44, //  consistent avatar sizing
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "12px 18px", // balanced spacing
          marginBottom: "6px", // spacing between list items
          "&.Mui-selected": {
            backgroundColor: "rgba(124,58,237,0.08)",
            color: "#6D28D9",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "1.25rem", //  bigger spacing between inputs
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 14px", // touch-friendly
        },
      },
    },
  },
});

export default professionalTheme;
