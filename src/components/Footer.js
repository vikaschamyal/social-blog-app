// src/components/Footer.js
import { Box, Typography, Link, Divider } from "@mui/material";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 4,
        px: 2,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      {/* App Name */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        ChatLog
      </Typography>

      {/* About the App */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: "600px", mx: "auto", mb: 2 }}
      >
        On ChatLog, the world feels closer. Meet people, exchange ideas, and grow together — a social space crafted with simplicity and modern design in mind.
      </Typography>

     

      {/* Social Links */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <Link href="https://github.com/vikaschamyal" target="_blank" color="inherit">
          <BsGithub size={22} />
        </Link>
        <Link href="https://twitter.com" target="_blank" color="inherit">
          <BsTwitter size={22} />
        </Link>
        <Link href="https://www.linkedin.com/in/vikas-chamyal24/" target="_blank" color="inherit">
          <BsLinkedin size={22} />
        </Link>
      </Box>

      {/* Legal & Copyright */}
      <Typography variant="caption" color="text.secondary" display="block">
        © {new Date().getFullYear()} ChatLog. All rights reserved.
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Terms of Service · Privacy Policy
      </Typography>
    </Box>
  );
}

export default Footer;
