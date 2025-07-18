import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const APPS = ["LinkedIn", "Twitter", "Instagram"];
const AIS = ["GPT", "Gemini"];

type Task = {
  id: number;
  app: string;
  ai: string;
  prompt: string;
  status: "Pending" | "Running" | "Success" | "Failed";
};

function App() {
  const [app, setApp] = useState(APPS[0]);
  const [ai, setAi] = useState(AIS[0]);
  const [prompt, setPrompt] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskId, setTaskId] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setTasks([
      ...tasks,
      {
        id: taskId,
        app,
        ai,
        prompt,
        status: "Pending",
      },
    ]);
    setTaskId(taskId + 1);
    setPrompt("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Automate a Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <TextField
            select
            label="App to Automate"
            value={app}
            onChange={(e) => setApp(e.target.value)}
            fullWidth
            margin="normal"
          >
            {APPS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="AI to Use"
            value={ai}
            onChange={(e) => setAi(e.target.value)}
            fullWidth
            margin="normal"
          >
            {AIS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Task Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            required
            placeholder="e.g., Like all posts with #AI"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit Task
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          My Tasks
        </Typography>
        <List>
          {tasks.length === 0 && (
            <ListItem>
              <ListItemText primary="No tasks yet." />
            </ListItem>
          )}
          {tasks.map((task) => (
            <ListItem key={task.id} sx={{ bgcolor: "#f5f5f5", mb: 1, borderRadius: 1 }}>
              <ListItemText
                primary={`${task.app} | ${task.ai}`}
                secondary={
                  <>
                    <strong>Prompt:</strong> {task.prompt}
                    <br />
                    <strong>Status:</strong> {task.status}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
