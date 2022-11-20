import { Box, makeStyles, Tooltip, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { Triangle } from "phosphor-react";
import { useDispatch } from "react-redux";
import { setSelectedTask } from "../Store/actionCreators/taskCreator";
import {
  setEditMode,
  toggleCreateEditModal
} from "../Store/actionCreators/uiActionCreator";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid gray",
    borderRadius: 8,
    padding: "5px",
    minHeight: "100px",
    cursor: "pointer",
    marginBottom: "10px"
  },
  row1: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  row2: {
    marginTop: "20px"
  }
});

export default function TaskCard({ taskData = {} }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { title, id, priority, dueDate } = taskData;

  const handleTaskClick = () => {
    dispatch(setSelectedTask(taskData));
    dispatch(setEditMode(true));
    dispatch(toggleCreateEditModal());
  };

  function getPriorityIcon() {
    switch (priority) {
      case "HIGH":
        return <Triangle size={20} color="red" weight="fill" />;

      case "MEDIUM":
        return <Triangle size={20} color="blue" weight="fill" />;

      default:
        return <Triangle size={20} color="gray" weight="fill" />;
    }
  }

  return (
    <Box className={classes.container} onClick={handleTaskClick}>
      <Box className={classes.row1}>
        <Typography component="div" noWrap>
          {title}
        </Typography>
        <Typography component="div">KB-{id}</Typography>
      </Box>
      <Box className={classes.row2}>
        <Tooltip arrow title={`Priority - ${priority}`}>
          {getPriorityIcon()}
        </Tooltip>
      </Box>
      <Box>
        <Tooltip
          placement="start-left"
          arrow
          title={`Due Date - ${dayjs(dueDate).format("MMM D, YYYY")}`}
        >
          <Typography>{dayjs(dueDate).format("MMM D, YYYY")}</Typography>
        </Tooltip>
      </Box>
    </Box>
  );
}
