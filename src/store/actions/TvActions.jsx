
import axios from "../../utils/axios";
import { loadTv } from "../Reducers/tvSlice";

export {removeTv} from "../Reducers/tvSlice"

export const asyncLoadTv = ({id})=> async (dispatch, getstate)=>{
    // console.log(id);
   
    // const dispatch = useDispatch()
    
    try{
        const detail = await axios.get(`/tv/${id}`);
        const externalId = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similer = await axios.get(`/tv/${id}/similar`)
        const translations = await axios.get(`/tv/${id}/translations`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const watchProviders = await axios.get(`/tv/${id}/watch/providers`)

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
        
        dispatch(loadTv(theUltimateData))

    }catch(error){
        console.log("Error loading", error);
        
    }
}
