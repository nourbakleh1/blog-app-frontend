import axios from "axios";

export const publicReq= axios.create(
        {
            baseURL:"http://localhost:8000"
        }
    
    )