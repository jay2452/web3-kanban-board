import { SET_EDIT_MODE, TOGGLE_EDIT_CREATE_MODAL } from "../../actionTypes";

export const toggleCreateEditModal = () => {
  return {
    type: TOGGLE_EDIT_CREATE_MODAL
  };
};

export const setEditMode = (isEditMode) => {
  return {
    type: SET_EDIT_MODE,
    values: {
      isEditMode
    }
  };
};
