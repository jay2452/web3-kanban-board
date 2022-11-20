import {
  CURRENT_SELECTED_TASK,
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from "../../actionTypes";
import getKanbanContract from "../../utils.js";

const setTasksInList = (list) => {
  return {
    type: SET_TASKS,
    values: {
      list
    }
  };
};

const addTaskInExistingList = (taskDetails) => {
  return {
    type: ADD_TASK,
    values: {
      taskDetails
    }
  };
};

export const fetchBoardData = () => {
  return async function (dispatch) {
    try {
      const KanbanContract = await getKanbanContract();
      if (KanbanContract) {
        KanbanContract.getTasks().then((res) => {
          if (Array.isArray(res)) {
            const updatedList = res.map((item) => {
              return {
                title: item.title,
                description: item.description,
                taskState: item.taskState,
                priority: item.priority,
                id: parseInt(item.id._hex, 16),
                dueDate: new Date(parseInt(item.dueDate._hex, 16)),
                isDeleted: item.isDeleted
              };
            });
            dispatch(setTasksInList(updatedList));
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addTask = (taskDetails = {}) => {
  return async function (dispatch) {
    try {
      const KanbanContract = await getKanbanContract();
      if (KanbanContract) {
        // title, description, dueDate, priority, taskState, createUser,  isDeleted
        const {
          title,
          description,
          dueDate,
          priority = "LOW",
          taskState = "TODO",
          createUser = "jayant",
          isDeleted = false
        } = taskDetails;
        const updatedDueDate = new Date(dueDate).getTime();
        KanbanContract.addTask(
          title,
          description,
          updatedDueDate,
          priority,
          taskState,
          createUser,
          isDeleted
        )
          .then((res) => {
            dispatch(addTaskInExistingList(taskDetails));
          })
          .catch((err) => console.error(err));
      } else {
        console.error("Etherium wallet doesnot exist");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const deleteTaskFromState = (taskId) => {
  return {
    type: DELETE_TASK,
    values: {
      taskId
    }
  };
};

export const deleteTask = (taskId) => {
  return async function (dispatch) {
    // DELETE_TASK
    try {
      const KanbanContract = await getKanbanContract();
      if (KanbanContract) {
        KanbanContract.deleteTasks(taskId, true).then((res) => {
          dispatch(deleteTaskFromState(taskId));
        });
      } else {
        console.error("Etherium wallet doesnot exist");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const updateTaskInState = (taskDetails) => {
  return {
    type: UPDATE_TASK,
    values: {
      taskDetails
    }
  };
};

export const updateTask = (taskDetails) => {
  return async function (dispatch) {
    try {
      const KanbanContract = await getKanbanContract();
      if (KanbanContract) {
        const {
          id,
          title,
          description,
          dueDate,
          priority = "LOW",
          taskState = "TODO"
        } = taskDetails;

        const updatedDueDate = new Date(dueDate).getTime();
        //  taskId,  title,  description,   dueDate,  priority,  taskState
        KanbanContract.updateTaskFields(
          id,
          title,
          description,
          updatedDueDate,
          priority,
          taskState
        )
          .then((res) => {
            dispatch(updateTaskInState(taskDetails));
          })
          .catch((err) => console.error(err));
      } else {
        console.error("Etherium wallet doesnot exist");
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const setSelectedTask = (selectedTask) => {
  return {
    type: CURRENT_SELECTED_TASK,
    values: {
      selectedTask
    }
  };
};
