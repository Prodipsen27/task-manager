import React, { useContext,useState } from "react";
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
  Tooltip ,
  Dialog, DialogTitle, DialogContent,
  // Paper,
  Box,
} from "@mui/material";

const TaskItem = ({ task, index, handleDragStart, handleDrop }) => {
  const dispatch = useDispatch();
  const { themeMode } = useContext(ThemeContext); // Get the current theme
  const [taskFormOpen, setTaskFormOpen] = useState(true);
  return (
    <Tooltip title="Drag & Drop" >
    <Card
      
      // draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, index)}
      sx={{
        display: "flex",
        // position:"static",
        flexDirection: "column", // Align content vertically
        // alignItems: "flex-start", // Align items to the start
        justifyContent: "space-between",
        padding: "5px",
        marginBottom: "10px",
        width: "100%", // Ensures the card occupies the full width of its container
        backgroundColor: task.completed ? "#d3f8d3" : themeMode === "dark" ? "#1e1e1e" : "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        cursor: "grab",
        color: task.completed ? "#000" : themeMode === "dark" ? "#fff" : "#000",
        borderLeft: `5px solid ${
          task.priority === "High"
            ? "red"
            : task.priority === "Medium"
            ? "orange"
            : "green"
        }`,
        transition: "0.3s",
        "&:hover": { boxShadow: "5px 5px 15px rgba(0,0,0,0.2)" },
      }}
    >
      <CardContent draggable sx={{width:'100%'}}> {/* Ensure CardContent stretches full width */}
        
        {/* Task Title */}
        <Box 
  sx={{
    display: "flex", // Ensures content is displayed side by side
    alignItems: "center", // Aligns items vertically
    gap: "10px" // Adds spacing between index and title
  }}
>
<Checkbox
          checked={task.completed}
          onChange={() => dispatch(toggleComplete(task.id))}
          color="success"
        />
  {/* Index */}
  <Typography
    variant="h8" 
    sx={{ fontWeight: "bold", color:'GrayText'}}
  >
   Task {index + 1}:
  </Typography>

  
</Box>
<Box sx={{marginLeft:'10px'}}>
          {/* Title */}
  <Typography
    variant="h6"
    sx={{ margin: "5px",
      textDecoration: task.completed ? "line-through" : "none",
      // color:'black',
      fontWeight: "bold",
    }}
  >
    {task.title}
  </Typography>
          {/* {task.title}
        </Typography> */}

        {/* Description Below Title */}
        <Typography
          variant="caption"
          sx={{
            margin: "5px", // Add spacing below the title
            color: themeMode === "dark"  ? task.completed:'#000',
            alignItems:'center'
          }}
        >
          <i>{task.description}</i>
        </Typography>
      </Box>
      </CardContent>
      {/* Task Actions */}
      <Box
        sx={{
          position:'inherit',
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%", // Ensure full width for actions container
          marginTop: "10px",
        }}
      >
        
        <Typography variant="caption" sx={{ marginLeft: "auto" }}>
          Created: <b>{task.date}</b>
        </Typography>
        <Tooltip title="Delete Task" arrow>
        <IconButton onClick={() => dispatch(deleteTask(task.id))} color="error">
          <DeleteIcon />
        
        </IconButton>
        </Tooltip>
        
       
      <EditTask task={task}/>
       
        
        

      </Box>
    </Card>
    </Tooltip>
  );
};

export default TaskItem;