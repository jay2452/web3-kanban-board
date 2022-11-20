import { Box, makeStyles, Typography } from "@material-ui/core";
import TaskCard from "./TaskCard";

const useStyles = makeStyles({
  container: {
    border: "1px solid grey",
    borderRadius: 8,
    minHeight: 400,
    maxWidth: 300,
    minWidth: 250,
    margin: "auto"
  },
  titleBox: {
    borderBottom: "1px solid grey",
    paddingLeft: 10
  },
  taskList: {
    padding: 10,
    height: "100%"
  }
});

export default function Swimlane({ title, data = [] }) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.titleBox}>
        <Typography variant="subtitle1">{title}</Typography>
      </Box>
      <Box className={classes.taskList}>
        {data.map((item) => {
          return <TaskCard key={item.id} taskData={item} />;
        })}
      </Box>
    </Box>
  );
}
