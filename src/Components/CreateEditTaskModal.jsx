import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import { useState, useEffect, useCallback } from "react";
import { TrashSimple, X } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateEditModal } from "../Store/actionCreators/uiActionCreator";
import {
  addTask,
  deleteTask,
  setSelectedTask,
  updateTask
} from "../Store/actionCreators/taskCreator";

const useStyles = makeStyles({
  dialogTitle: {
    padding: "24px",
    display: "flex",
    justifyContent: "space-between"
  },
  dialogContent: {
    "& .MuiFormControl-root": {
      marginBottom: 20
    }
  }
});

export default function CreateEditTaskModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uiStates = useSelector((state) => state.UIs);

  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskState, setTaskState] = useState("TODO");

  useEffect(() => {
    if (selectedTask) {
      console.log("hello ");
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setPriority(selectedTask.priority);
      setDueDate(selectedTask.dueDate);
      setTaskState(selectedTask.taskState);
    }
  }, [selectedTask]);

  const taskDetails = {
    id: selectedTask && selectedTask.id,
    title,
    description,
    priority,
    dueDate,
    taskState,
    isDeleted: false
  };

  const handleClose = () => {
    dispatch(setSelectedTask(null));
    dispatch(toggleCreateEditModal());
  };

  const handleSave = () => {
    if (uiStates.isEditMode) {
      dispatch(updateTask(taskDetails));
    } else {
      dispatch(addTask(taskDetails));
    }
    handleClose();
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleTaskStateChange = (e) => {
    setTaskState(e.target.value);
  };

  const handleDeleteTask = useCallback(() => {
    if (selectedTask && selectedTask.id >= 0) {
      dispatch(deleteTask(selectedTask.id));
    }
  }, [dispatch, selectedTask]);

  useEffect(() => {
    if (!uiStates.isCreateEditTaskModalOpen) {
      // reset the form
      setTitle("");
      setPriority("LOW");
      setDescription("");
      setTaskState("TODO");
      setDueDate("");
    }
  }, [uiStates.isCreateEditTaskModalOpen]);

  return (
    <Dialog
      open={uiStates.isCreateEditTaskModalOpen}
      onClose={handleClose}
      fullWidth
    >
      <Box className={classes.dialogTitle}>
        <Typography variant="h5">
          {uiStates.isEditMode ? selectedTask.title : "Create Task"}
        </Typography>
        <Box>
          {uiStates.isEditMode && (
            <Tooltip title={`Delete Task`} arrow>
              <IconButton onClick={handleClose}>
                <TrashSimple
                  size={20}
                  color="#e91616"
                  weight="fill"
                  onClick={handleDeleteTask}
                />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Close dialog" arrow>
            <IconButton onClick={handleClose}>
              <X />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <DialogContent className={classes.dialogContent}>
        {uiStates.isEditMode && (
          <FormControl fullWidth>
            <Select
              variant="outlined"
              value={taskState}
              onChange={handleTaskStateChange}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="IN_PROGRESS">INPROGRESS</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </Select>
          </FormControl>
        )}

        <FormControl fullWidth>
          <TextField
            variant="outlined"
            placeholder="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            type="date"
            variant="outlined"
            placeholder="Due Date (YYYY-MM-DD)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel shrink id="priority-dialog-label-id">
            Priority
          </InputLabel>
          <Select
            displayEmpty
            labelId="priority-dialog-label-id"
            variant="outlined"
            label="Priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="LOW">LOW</MenuItem>
          </Select>
        </FormControl>

        {!uiStates.isEditMode ? (
          <FormControl fullWidth>
            <InputLabel shrink id="priority-dialog-label-id">
              State
            </InputLabel>
            <Select
              displayEmpty
              labelId="priority-dialog-label-id"
              variant="outlined"
              label="Priority"
              value={taskState}
              onChange={handleTaskStateChange}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="IN_PROGRESS">In PROGRESS</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </Select>
          </FormControl>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
