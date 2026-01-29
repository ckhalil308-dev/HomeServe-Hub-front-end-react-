import api  from "./AxiosInstance";

export const SearchServiceAI= async (prompt) => {

    const response= await api.post("/ai/generate-client-need",prompt)
    return response.data;
}
export default  {SearchServiceAI};