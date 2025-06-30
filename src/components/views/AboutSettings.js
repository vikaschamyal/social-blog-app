import { Box, Typography, Stack, Link } from "@mui/material";
import { MdInfo } from "react-icons/md";

const AboutSettings = () => {
  return (
    <Box sx={{ p: 3, maxWidth: "md", mx: "auto" }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <MdInfo size={32} />
        <Typography variant="h4" component="h1">
          About This App
        </Typography>
      </Stack>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Application Information
        </Typography>
        
        <Typography paragraph>
          This is a modern social media application designed to connect people and share moments.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Version
        </Typography>
        <Typography paragraph>1.0.0</Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          License
        </Typography>
        <Typography paragraph>
          MIT License - Open Source
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Source Code
        </Typography>
        <Typography paragraph>
          <Link href="https://github.com/yourusername/yourrepo" target="_blank">
            GitHub Repository
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutSettings;