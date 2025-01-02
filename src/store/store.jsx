import { configureStore } from '@reduxjs/toolkit'
import tvslice from './Reducers/tvSlice'
import personReducer from "../store/Reducers/PersonSlice"
import  movieReducer from './Reducers/MovieSlice'


export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv:tvslice,
    person:personReducer,
  },
})

 

