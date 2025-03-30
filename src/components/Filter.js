import { Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Filter = ({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Status Filter */}
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel><b>Status</b></InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Priority Filter */}
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel><b>Priority</b></InputLabel>
          <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem> {/* Changed from "Neutral" to "Low" */}
          </Select>
        </FormControl>
      </Grid>

      {/* Sort By */}
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel><b>Sort By</b></InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Sort Order (Only shows when sorting by date) */}
      {sortBy === "date" && (
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel><b>Order</b></InputLabel>
            <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default Filter;
