import { configureStore } from '@reduxjs/toolkit';
import { newApi } from './newApi';
export default configureStore({
  reducer: {
    
  [newApi.reducerPath]:newApi.reducer,
  },
});
