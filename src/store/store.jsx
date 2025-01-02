import { configureStore } from '@reduxjs/toolkit'
import personReducer from "../store/Reducers/PersonSlice"
import  movieReducer from './Reducers/MovieSlice'
import tvreducer from './Reducers/tvSlice'


export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv:tvreducer,
    person:personReducer,
  },
})

 

