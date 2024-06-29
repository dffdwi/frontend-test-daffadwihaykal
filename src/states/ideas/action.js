import api from '../../utils/api';

const ActionType = {
  RECEIVE_IDEAS: 'RECEIVE_IDEAS',
};

function receiveIdeasActionCreator(ideas) {
  return {
    type: ActionType.RECEIVE_IDEAS,
    payload: {
      ideas,
    },
  };
}

function asyncFetchIdeas() {
  return async (dispatch) => {
    try {
      const ideas = await api.getAllIdeas();
      dispatch(receiveIdeasActionCreator(ideas));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, receiveIdeasActionCreator, asyncFetchIdeas };
