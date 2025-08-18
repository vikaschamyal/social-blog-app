import { Box, Typography, Stack, Button } from "@mui/material";
import { MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AboutSettings = () => {
  const navigate = useNavigate();

  const appFeatures = [
    "User authentication & profiles",
    "Post creation, likes, and comments",
    "Real-time messaging & notifications",
    "Search users and posts",
    "Responsive design for mobile and desktop",
    "Settings and profile customization",
    "Secure JWT-based authentication",
    "Open-source and continuously updatable",
  ];

  return (
    <Box sx={{ p: 3, maxWidth: "md", mx: "auto" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <MdInfo size={32} />
        <Typography variant="h4" component="h1">
          About ChatLog
        </Typography>
      </Stack>

      {/* Back Button */}
      <Button 
        variant="outlined" 
        sx={{ mb: 4 }} 
        onClick={() => navigate("/")}
      >
        ← Back to App
      </Button>

      {/* App Details */}
      <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Typography paragraph>
          ChatLog is a modern social media and messaging platform designed to connect users, share content, and communicate seamlessly in real-time.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Key Features
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          {appFeatures.map((feature, idx) => (
            <li key={idx}>
              <Typography component="span">{feature}</Typography>
            </li>
          ))}
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Version & License
        </Typography>
       
        <Typography paragraph>
          <a 
            href="https://github.com/vikaschamyal" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "#1976d2" }}
          >
            GitHub Repository
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutSettings;
