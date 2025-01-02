import { configureStore } from '@reduxjs/toolkit'
import  { TvSlice } from './Reducers/tvSlice'
import  { PersonSlice } from "../store/Reducers/PersonSlice"
import   { movieSlice } from './Reducers/MovieSlice'


export const store = configureStore({
  reducer: {
    movie: movieSlice,
    tv:TvSlice,
    person:PersonSlice,
  },
})

 

