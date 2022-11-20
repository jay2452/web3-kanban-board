import { Box, makeStyles } from "@material-ui/core";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import Swimlane from "./Swimlane";

const useStyles = makeStyles({
  board: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridColumnGap: "20px",
    padding: 20,
    margin: "auto"
  }
});

export default memo(function KanbanBoard(props) {
  const classes = useStyles();

  const tasksList = useSelector((state) => state.tasks.taskList);

  const [todoList, inProgressList, doneList] = useMemo(() => {
    const todos = [];
    const inProgressList = [];
    const doneList = [];
    tasksList &&
      tasksList.forEach((item) => {
        if (!item.idDeleted) {
          if (item.dueDate && item.dueDate.toString() !== "Invalid Date") {
            item.dueDate = new Date(item.dueDate).toISOString().split("T")[0];
          } else if (item.dueDate.toString() === "Invalid Date") {
            delete item.dueDate;
          }

          if (item.taskState.toLowerCase() === "TODO".toLowerCase())
            todos.push(item);
          if (
            item.taskState.toLowerCase() === "INPROGRESS".toLowerCase() ||
            item.taskState.toLowerCase() === "IN_PROGRESS".toLowerCase()
          )
            inProgressList.push(item);
          if (item.taskState.toLowerCase() === "DONE".toLowerCase())
            doneList.push(item);
        }
      });
    return [todos, inProgressList, doneList];
  }, [tasksList]);

  return (
    <Box className={classes.board}>
      <Swimlane title="TODO" data={todoList} />
      <Swimlane title="InProgress" data={inProgressList} />
      <Swimlane title="Done" data={doneList} />
    </Box>
  );
});
