import { configureStore } from '@reduxjs/toolkit';
import ideasReducer from './ideas/reducer';

const store = configureStore({
  reducer: {
    ideas: ideasReducer,
  },
});

export default store;
