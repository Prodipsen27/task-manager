import { useState } from "react";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import ThemeContext from "../context/ThemeContext"; 
import { addTask } from "../redux/taskSlice";
import { TextField, Button, Paper, Box, MenuItem, Popover, Typography } from "@mui/material";
import {v4 as uuid4} from 'uuid';

const TaskForm = () => {
  const [title, setTitle] = useState(""); // State for task title
  const [description, setDescription] = useState(""); // State for task title
  const [priority, setPriority] = useState("Medium"); // State for task priority
  const [anchorEl, setAnchorEl] = useState(null); // State for managing Popover
  const dispatch = useDispatch();
  const { themeMode } = useContext(ThemeContext); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // console.log(today.toLocaleDateString()); // Outputs the date in your locale's format
    // Dispatching task with title and priority
    dispatch(addTask({ id: uuid4(),date:date,time:time, title,description, completed: false, priority}));
    setTitle(""); // Reset task title
    setDescription("");
    setPriority("Neutral"); // Reset priority to default
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <Paper sx={{ padding: "20px", boxShadow: 3, position: "relative" }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Priority Popover */}
        <Typography
          onClick={handlePopoverOpen}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom:'20px',
            color:
      priority === "High"
        ? "red"
        : priority === "Medium"
        ? "orange"
        : priority === "Neutral"
        ? themeMode === "dark" ? "lightgreen" : "green"
        : "white",
          }}
        >
          Priority: {priority}
        </Typography>
        {/* Task Title Input */}
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="New Task"
          sx={{
            position: "relative",
            marginTop:'20px',
            // width:'200px',
            fontSize: "20px",
            fontWeight: "bold",
          }}
          fullWidth
        />

        {/* Task Description */}
                   <TextField
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     label="Edit Description"
                     fullWidth
                     multiline
                     rows={3}
                   />

        
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
            marginBottom:'20px'
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
            
          }}
        >
          <Box sx={{ padding: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <MenuItem onClick={() => { setPriority("High"); handlePopoverClose(); }}>High</MenuItem>
            <MenuItem onClick={() => { setPriority("Medium"); handlePopoverClose(); }}>Medium</MenuItem>
            <MenuItem onClick={() => { setPriority("Neutral"); handlePopoverClose(); }}>Neutral</MenuItem>
          </Box>
        </Popover>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;