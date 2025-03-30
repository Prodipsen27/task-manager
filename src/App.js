import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ThemeSwitcher from "./components/ThemeSwitcher";
import {Paper, Container, Typography, Fab, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

const App = () => {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false);

  return (
    <Container maxWidth="md">
      {/* Header */}
      <Paper 
        elevation={4}
        sx={{ 
          // padding: { xs: 2, sm: 3, md: 4 }, 
          textAlign: "center", 
          borderRadius: "10px", 
          backgroundColor: "#1e1e30", 
          color: "#fff",
          marginBottom: 4 
        }}
      >
        <Dialog 
        open={themeSwitcherOpen} 
        onClose={() => setThemeSwitcherOpen(false)} 
        maxWidth="sm"
        fullWidth
        color="black"
      >
        <DialogTitle>Switch Theme</DialogTitle>
        <DialogContent>
          <ThemeSwitcher />
        </DialogContent>
      </Dialog>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: "bold", 
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } // Responsive font sizes
          }}
        >
          Task Manager
        </Typography>
        <Typography 
          variant="subtitle1"
          sx={{ fontStyle: "italic" }}
        >
          Plan your day and stay productive
        </Typography>
      </Paper>

      {/* Theme Switcher Button */}
      <IconButton
        color="primary"
        sx={{ position: "fixed", top: 20, right: 20 }}
        onClick={() => setThemeSwitcherOpen(true)}
      >
        <SettingsIcon />
      </IconButton>

      <TaskList />

      {/* Floating Action Button for Task Form */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => setTaskFormOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Pop-up Task Form */}
      <Dialog 
        open={taskFormOpen} 
        onClose={() => setTaskFormOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TaskForm />
        </DialogContent>
      </Dialog>

      {/* Pop-up Theme Switcher */}
      
    </Container>
  );
};

export default App;
