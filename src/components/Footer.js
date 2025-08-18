// src/components/Footer.js
import { Box, Typography, Link, Divider, Stack, IconButton } from "@mui/material";
import { BsGithub, BsTwitter, BsLinkedin, BsPersonCircle } from "react-icons/bs";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 6,
        px: { xs: 3, sm: 6 },
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* App Name */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "primary.main" }}
      >
        ChatLog
      </Typography>

      {/* Short Description */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 700, mx: "auto", textAlign: "center", mb: 3 }}
      >
        On ChatLog, the world feels closer. Connect with friends, share moments, and explore communities. Modern, clean, and crafted for seamless interaction.
      </Typography>

      <Divider sx={{ mb: 3, mx: "auto", width: "80%" }} />

      {/* Social & Portfolio Links */}
      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mb: 3 }}>
        <IconButton component={Link} href="https://github.com/vikaschamyal" target="_blank" color="inherit">
          <BsGithub size={22} />
        </IconButton>
        {/* <IconButton component={Link} href="https://twitter.com" target="_blank" color="inherit">
          <BsTwitter size={22} />
        </IconButton> */}
        <IconButton component={Link} href="https://www.linkedin.com/in/vikas-chamyal24" target="_blank" color="inherit">
          <BsLinkedin size={22} />
        </IconButton>
        <IconButton component={Link} href="https://portfolio-lac-six-83.vercel.app/" target="_blank" color="inherit">
          <BsPersonCircle size={22} />
        </IconButton>
      </Stack>

      {/* Contact / Quick Info */}
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" spacing={4} sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          Email: <Link href="mailto:vikaschamyal@gmail.com" color="inherit" underline="hover">vikaschamyal@gmail.com</Link>
        </Typography>
      
      </Stack>

      

      {/* Legal & Copyright */}
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" spacing={2}>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
          © {new Date().getFullYear()} ChatLog. All rights reserved.
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
          <Link href="/terms" color="inherit" underline="hover">Terms of Service</Link> · <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
