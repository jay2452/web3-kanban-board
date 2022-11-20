import { combineReducers } from "redux";

import tasks from "./taskReducer";
import UIs from "./uiReducer";

export default combineReducers({
  tasks,
  UIs
});
