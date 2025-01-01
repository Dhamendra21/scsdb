
import axios from "../../utils/axios";
import { loadMovie } from "../Reducers/MovieSlice";

export {removeMovie} from "../Reducers/MovieSlice"

export const asyncLoadMovie = ({id})=> async (dispatch, getstate)=>{
    // console.log(id);
   
    // const dispatch = useDispatch()
    
    try{
        const detail = await axios.get(`/movie/${id}`);
        const externalId = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similer = await axios.get(`/movie/${id}/similar`)
        const translations = await axios.get(`/movie/${id}/translations`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`)

        const theUltimateData = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similer: similer.data.results,
            translations: translations.data.translations.map((t)=>t.name),
            videos: videos.data.results.find(m => m.type === "Trailer"),
            watchProviders: watchProviders.data.results.IN 
        }
        // console.log(theUltimateData);
        
        dispatch(loadMovie(theUltimateData))

    }catch(error){
        console.log("Error loading", error);
        
    }
}
