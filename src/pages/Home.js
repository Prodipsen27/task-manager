import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Container, Typography, Paper } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
      <Paper sx={{ padding: "20px", textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "10px", color:'AppWorkspace' }}>
          Task Manager
        </Typography>
        <TaskForm />
        <TaskList />
      </Paper>
    </Container>
  );
};

export default Home;
