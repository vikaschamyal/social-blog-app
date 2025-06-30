import { Box, Typography, Stack, Avatar, Link } from "@mui/material";
import { MdCode } from "react-icons/md";

const DeveloperSettings = () => {
  return (
    <Box sx={{ p: 3, maxWidth: "md", mx: "auto" }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <MdCode size={32} />
        <Typography variant="h4" component="h1">
          Developer Information
        </Typography>
      </Stack>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          src="/developer-avatar.jpg" // Replace with actual path
          sx={{ width: 100, height: 100, mb: 3 }}
        />
        
        <Typography variant="h5" gutterBottom>
          Vikas Chamyal
        </Typography>
        
        <Typography variant="body1" paragraph>
          Full stack developer passionate about creating great user experiences.
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Link href="https://github.com/vikaschamyal" target="_blank">
            GitHub
          </Link>
          {/* <Link href="https://twitter.com/developer" target="_blank">
            Twitter
          </Link> */}
          <Link href="https://www.linkedin.com/in/vikas-chamyal24/" target="_blank">
            LinkedIn
          </Link>
        </Stack>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Technologies Used
        </Typography>
        <Typography paragraph>
          React, Material-UI, Node.js, MongoDB
        </Typography>
      </Box>
    </Box>
  );
};

export default DeveloperSettings;