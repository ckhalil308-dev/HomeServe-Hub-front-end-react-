import api  from "./AxiosInstance";

export const SearchServiceAI= async (prompt) => {

    const response= await api.post("/ai/generate-client-need",prompt)
    return response.data;
}
export const UpdateDescriptionAI= async (description) => {

    const response= await api.post("/ai/update-description",description)
    return response.data;
}
export const updateNeed= async (description) => {

    const response= await api.post("/ai/update-need",description)
    return response.data;
}
export default  {SearchServiceAI, UpdateDescriptionAI, updateNeed};