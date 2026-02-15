import api from "./AxiosInstance";

export const getCommentsByServiceId = async (serviceId,page) => {
    const response = await api.get(`/comments/service/${serviceId}?page=${page}`);
    return response.data;
}
export const addCommentToService = async (serviceId, commentData) => {
    const response = await api.post(`/comments/ajouter/`, commentData,serviceId);
    return response.data;
}
export const getServiceRating=async(ServiceId)=>{
    const response= await api.get('/comments/avgNote/'+ServiceId)
    return response.data

}