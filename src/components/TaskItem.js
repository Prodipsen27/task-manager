import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleComplete } from "../redux/taskSlice";
import ThemeContext from "../context/ThemeContext"; // Import theme context
import DeleteIcon from "@mui/icons-material/Delete";
import EditTask from "./EditTask";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  Tooltip,
  Box,
} from "@mui/material";

const TaskItem = ({ task, index, handleDragStart, handleDrop }) => {
  const dispatch = useDispatch();
  const { themeMode } = useContext(ThemeContext); // Get the current theme

  return (
    <Tooltip title="Drag & Drop">
      <Card
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, index)}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "5px",
          marginBottom: "10px",
          width: "100%",
          backgroundColor: task.completed ? "#d3f8d3" : themeMode === "dark" ? "#1e1e1e" : "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "grab",
          color: task.completed ? "#000" : themeMode === "dark" ? "#fff" : "#000",
          borderLeft: `5px solid ${
            task.priority === "High" ? "red" : task.priority === "Medium" ? "orange" : "green"
          }`,
          transition: "0.3s",
          "&:hover": { boxShadow: "5px 5px 15px rgba(0,0,0,0.2)" },
          position: "relative",
        }}
      >
        <CardContent draggable sx={{ width: "100%", position: "relative" }}> 
          {/* Time (Top-Right) */}
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              fontSize: "12px",
              color: "gray",
            }}
          >
            {task.time}
          </Typography>

          {/* Task Title and Index */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Checkbox checked={task.completed} onChange={() => dispatch(toggleComplete(task.id))} color="success" />
            <Typography variant="h8" sx={{ fontWeight: "bold", color: "GrayText" }}>
              Task {index + 1}:
            </Typography>
          </Box>

          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              variant="h6"
              sx={{
                margin: "5px",
                textDecoration: task.completed ? "line-through" : "none",
                fontWeight: "bold",
              }}
            >
              {task.title}
            </Typography>

            {/* Task Description */}
            <Typography
              variant="caption"
              sx={{
                margin: "5px",
                color: themeMode === "dark" ? task.completed : "#000",
              }}
            >
              <i>{task.description}</i>
            </Typography>
          </Box>
        </CardContent>

        {/* Bottom Section (Date & Actions) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: "10px",
            padding: "8px",
          }}
        >
          {/* Date (Bottom-Left) */}
          <Typography variant="caption" sx={{ fontSize: "12px", color: "gray" }}>
            Created: <b>{task.date}</b>
          </Typography>

          {/* Task Actions (Bottom-Right) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Tooltip title="Delete Task" arrow>
              <IconButton onClick={() => dispatch(deleteTask(task.id))} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            <EditTask task={task} />
          </Box>
        </Box>
      </Card>
    </Tooltip>
  );
};

export default TaskItem;
