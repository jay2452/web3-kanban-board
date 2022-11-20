import { SET_EDIT_MODE, TOGGLE_EDIT_CREATE_MODAL } from "../../actionTypes";

const INITIAL_STATE = {
  isCreateEditTaskModalOpen: false,
  isEditMode: false
};

export default function (state = INITIAL_STATE, action) {
  const updatedState = { ...state };
  switch (action.type) {
    case TOGGLE_EDIT_CREATE_MODAL:
      updatedState.isCreateEditTaskModalOpen = !updatedState.isCreateEditTaskModalOpen;
      if (!updatedState.isCreateEditTaskModalOpen)
        updatedState.isEditMode = false;
      break;

    case SET_EDIT_MODE:
      updatedState.isEditMode = action.values.isEditMode;
      break;

    default:
      break;
  }

  return updatedState;
}
