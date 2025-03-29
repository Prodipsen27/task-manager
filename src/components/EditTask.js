import React, { useState, useContext } from "react";
import {
  IconButton,
  Tooltip,
  TextField,
  Button,
  Box,
  MenuItem,
  Popover,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import ThemeContext from "../context/ThemeContext";
import { editTask } from "../redux/taskSlice";

const EditTask = ({ task }) => {
  const dispatch = useDispatch();
  const { themeMode } = useContext(ThemeContext);

  // State for task details
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  // State for popover & dialog
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const today = new Date();

  // Open & close priority popover
  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const isPopoverOpen = Boolean(anchorEl);

  // Open & close edit dialog
  const handleEditOpen = () => setIsDialogOpen(true);
  const handleEditClose = () => setIsDialogOpen(false);

  // Handle task update
  const handleEdit = () => {
    if (!title.trim()) return;

    dispatch(
      editTask({
        id: task.id,
        date: today.toLocaleDateString(),
        title,
        description,
        completed: task.completed,
        priority,
      })
    );

    handleEditClose();
  };

  return (
    <>
      {/* Edit Button */}
      <Tooltip title="Edit Task" arrow>
        <IconButton onClick={handleEditOpen} color="info">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* Edit Task Dialog */}
      <Dialog open={isDialogOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              padding: "20px",
              backgroundColor: themeMode === "dark" ? "#2e2e2e" : "#fff",
              borderRadius: "8px",
            }}
          >
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
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
              <Box sx={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                {["High", "Medium", "Neutral"].map((level) => (
                  <MenuItem key={level} onClick={() => { setPriority(level); handlePopoverClose(); }}>
                    {level}
                  </MenuItem>
                ))}
              </Box>
            </Popover>
          </Box>
        </DialogContent>

        {/* Action Buttons */}
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Save Changes
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTask;
