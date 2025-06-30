import { createTheme } from "@mui/material";

const professionalTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3414d3", // Professional blue
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#566f80", // Neutral gray
      contrastText: "#FFFFFF"
    },
    background: {
      default: "#9bb6c6", // Light gray
      paper: "#FFFFFF" // White cards
    },
    text: {
      primary: "#010101", // Dark gray
      secondary: "#495057" // Medium gray
    }
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#212529",
      marginBottom: "1rem"
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#212529",
      marginBottom: "0.75rem"
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#495057",
      marginBottom: "1rem"
    },
    button: {
      textTransform: "none",
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 5
  },
  spacing: 7,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#f73d01 #f73d01",
          "&::-webkit-scrollbar": {
            width: 10
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#f73d01",
            borderRadius: 5
          }
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "1rem",
          paddingBottom: "4rem"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "6px solid #aba7a4",
          boxShadow: "0 2px 2px rgba(0,0,0,0.05)",
          marginBottom: "2rem",
          transition: "box-shadow 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          padding: "8px 20px",
          fontWeight: 500
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none"
          }
        }
      }
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "message" },
          style: ({ ownerState }) => ({
            padding: "12px 16px",
            borderRadius: ownerState.sent ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
            backgroundColor: ownerState.sent ? "#2561ea" : "#e9ecef",
            color: ownerState.sent ? "#FFFFFF" : "#212529",
            maxWidth: "75%",
            alignSelf: ownerState.sent ? "flex-end" : "flex-start",
            marginBottom: "0.5rem"
          })
        },
        {
          props: { variant: "blogCard" },
          style: {
            padding: "2rem",
            marginBottom: "2rem",
            "& h2": {
              transition: "color 0.2s ease"
            }
          }
        }
      ]
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: "2px solid #FFFFFF",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: "rgba(37, 97, 234, 0.08)"
          }
        }
      }
    }
  }
});

export default professionalTheme;