import {
  ADD_TASK,
  CURRENT_SELECTED_TASK,
  DELETE_TASK,
  SET_TASKS,
  UPDATE_TASK
} from "../../actionTypes";

const INITIAL_STATE = {
  taskList: undefined,
  selectedTask: null
};

export default function taskReducer(state = INITIAL_STATE, action) {
  const updatedState = { ...state };

  switch (action.type) {
    case SET_TASKS:
      updatedState.taskList = action.values.list;
      break;

    case ADD_TASK:
      {
        const taskDetails = action.values.taskDetails;
        updatedState.taskList = [...updatedState.taskList, { ...taskDetails }];
      }

      break;

    case UPDATE_TASK:
      {
        const task = action.values.taskDetails;
        let updatedDetails = updatedState.taskList.map((item) => {
          if (item.id === task.id) {
            item.title = task.title;
            item.description = task.description;
            item.priority = task.priority;
            item.taskState = task.taskState;
            item.isDeleted = task.isDeleted;
          }
          return item;
        });
        updatedState.taskList = updatedDetails;
      }
      break;

    case DELETE_TASK:
      {
        const taskId = action.values.taskId;
        const task = updatedState.taskList.find((item) => item.id === taskId);
        task.isDeleted = true;
        updatedState.taskList = [...updatedState.taskList];
      }
      break;

    case CURRENT_SELECTED_TASK:
      updatedState.selectedTask = action.values.selectedTask;
      break;

    default:
      break;
  }
  return updatedState;
}
