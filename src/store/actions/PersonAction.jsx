
import axios from "../../utils/axios";
import { loadPerson } from "../Reducers/personSlice";

export {removePerson} from "../Reducers/personSlice"

export const asyncLoadperson = ({id})=> async (dispatch, getstate)=>{
    // console.log(id);
   
    // const dispatch = useDispatch()
    
    try{
        const detail = await axios.get(`/person/${id}`);
        const externalId = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);
       
        
        const theUltimateData = {
            detail: detail.data,
            externalId: externalId.data,
            combinedCredits: combinedCredits.data,
            tvCredits: tvCredits.data,
            movieCredits: movieCredits.data
        }
        // console.log(theUltimateData);
        
        dispatch(loadPerson(theUltimateData))

    }catch(error){
        console.log("Error loading", error);
        
    }
}
