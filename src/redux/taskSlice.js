import { createSlice } from "@reduxjs/toolkit";

// ✅ Load tasks from localStorage or set a default task
const loadTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  return storedTasks && storedTasks.length > 0
    ? storedTasks
    : [
        {
          id: 1,
          title: "Welcome Task",
          description: "This is a default task.",
          priority: "Medium",
          completed: false,
          date: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ];
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTasks(), // ✅ Load tasks or set default
    filter: { status: "all", priority: "all", sortBy: "newest" }, // ✅ Sort newest first by default
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleComplete: (state, action) => {
      state.tasks = state.tasks.map((task) =>
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

// ✅ Select filtered tasks
export const selectFilteredTasks = (state) => {
  let tasks = [...state.tasks.tasks];
  const { status, priority, sortBy } = state.tasks.filter;

  // ✅ Filter by Status
  if (status !== "all") {
    tasks = tasks.filter((task) => (status === "completed" ? task.completed : !task.completed));
  }

  // ✅ Filter by Priority
  if (priority !== "all") {
    tasks = tasks.filter((task) => task.priority === priority);
  }

  // ✅ Sort by Date & Time
  if (sortBy === "newest") {
    tasks.sort((a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time));
  } else if (sortBy === "oldest") {
    tasks.sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time));
  }

  return tasks;
};

// ✅ Export Actions & Reducer
export const { addTask, editTask, deleteTask, toggleComplete, reorderTasks, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
