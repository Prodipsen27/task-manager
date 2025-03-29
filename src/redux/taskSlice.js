import { createSlice } from "@reduxjs/toolkit";

const loadTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTasks(), // ✅ Store tasks
    filter: { status: "all", priority: "all", sortBy: "date" }, // ✅ Store filters
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map(task => (task.id === action.payload.id ? action.payload : task));
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleComplete: (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    // ✅ Set filter options
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

// ✅ Export Actions
export const { addTask, editTask, deleteTask, toggleComplete, reorderTasks, setFilter } = taskSlice.actions;

// ✅ Select filtered tasks
export const selectFilteredTasks = (state) => {
  let tasks = state.tasks.tasks;
  const { status, priority, sortBy } = state.tasks.filter;

  // ✅ Filter by Status
  if (status !== "all") {
    tasks = tasks.filter(task => (status === "completed" ? task.completed : !task.completed));
  }

  // ✅ Filter by Priority
  if (priority !== "all") {
    tasks = tasks.filter(task => task.priority === priority);
  }

  // ✅ Sort by Date
  if (sortBy === "date") {
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return tasks;
};

// ✅ Export Reducer
export default taskSlice.reducer;
