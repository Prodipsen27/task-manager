import { Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Filter = ({ statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, sortBy, setSortBy }) => {
  return (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Status Filter */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Priority Filter */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Neutral">Low</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Sort By */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filter;
