import { ActionType } from './action';

const initialState = [];

const ideasReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_IDEAS:
      return action.payload.ideas;
    default:
      return state;
  }
};

export default ideasReducer;
