import axios from "axios";

const instance =  axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjBkOTY4YTJhZDdhZTljMjA0ZjUxYmQxNjkzMjNmOSIsIm5iZiI6MTczMDA4OTQxMi42MDQ2NTMsInN1YiI6IjY3MWVmYTVmNmQ2YjcwNWRjODcxZTA2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dExpNTydOzi5aC8XDCS-a4NveuNwBnfpR5v1elSJm1A'
      }
    
})

export default instance