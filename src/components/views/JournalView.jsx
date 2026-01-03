import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createJournal, getMyJournals } from "../../api/journals";
import { useNavigate } from "react-router-dom";

export default function JournalView() {
  const [content, setContent] = useState("");
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  const loadJournals = async () => {
    try {
      const data = await getMyJournals();
      setJournals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch journals failed", err);
    }
  };

  useEffect(() => {
    loadJournals();
  }, []);

  const handleSave = async () => {
    if (!content.trim()) return;

    try {
      await createJournal(content);
      setContent("");
      loadJournals();
    } catch (err) {
      console.error("Save journal failed", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Button onClick={() => navigate("/")} sx={{ mb: 2 }}>
        ← Back Home
      </Button>

      <Typography variant="h4" mb={2}>
        My Journal
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="Write your private thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>

      <Typography variant="h6" mt={4} mb={1}>
        My Entries
      </Typography>

      {journals.length === 0 && (
        <Typography color="text.secondary">
          No journal entries yet.
        </Typography>
      )}

      {journals.map((j) => (
        <Box
          key={j._id}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            mb: 2,
            background: "#fafafa",
          }}
        >
          <Typography variant="body2">{j.content}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(j.createdAt).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
