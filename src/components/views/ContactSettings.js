import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

const ContactSettings = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log("Contact form submitted:", message);
  };

  return (
    <Box sx={{ p: 3, maxWidth: "md", mx: "auto" }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <MdEmail size={32} />
        <Typography variant="h4" component="h1">
          Contact Us
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
          Get in Touch
        </Typography>
        
        <Typography paragraph>
          Have questions or feedback? Send us a message.
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Your Message"
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <Button type="submit" variant="contained">
            Send Message
          </Button>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Other Contact Methods
        </Typography>
        <Typography paragraph>
          Email: support@yourapp.com
        </Typography>
        <Typography paragraph>
          Twitter: @yourapp
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactSettings;