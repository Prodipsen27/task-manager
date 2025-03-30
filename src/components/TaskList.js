import { useSelector, useDispatch } from "react-redux";
import { reorderTasks } from "../redux/taskSlice";
import { Box, Paper } from "@mui/material";
import TaskItem from "./TaskItem";
import { useState } from "react";
import Filter from "./Filter"; // Import Filter Component

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  // Filter & Sort States
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date"); // "date" or "priority"
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"

  // Drag and Drop
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, targetIndex) => {
    const draggedIndex = e.dataTransfer.getData("index");
    if (draggedIndex === targetIndex) return;

    let updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, draggedTask);

    dispatch(reorderTasks(updatedTasks));
  };

  // Filter and Sort Tasks
  const getFilteredAndSortedTasks = () => {
    let filtered = tasks.filter(
      (task) =>
        (statusFilter === "all" || task.completed === (statusFilter === "completed")) &&
        (priorityFilter === "all" || task.priority === priorityFilter)
    );

    return filtered.sort((a, b) => {
      const timeA = new Date(`1970-01-01 ${a.time}`).getTime();
      const timeB = new Date(`1970-01-01 ${b.time}`).getTime();
  
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });
  
    
  };

  const filteredAndSortedTasks = getFilteredAndSortedTasks();

  return (
    <Paper sx={{ padding: "20px", marginTop: "20px", boxShadow: 3 }}>
      {/* Filter UI */}
      <Filter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Task List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        {filteredAndSortedTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default TaskList;
