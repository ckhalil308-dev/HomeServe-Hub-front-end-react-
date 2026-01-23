import api from "./AxiosInstance";
export const getAllServices=async(params)=>{
    const response= await  api.get(`/services/?${params}`);
    return response.data;

}
export const getServiceById=async(serviceId)=>{
    const response= await  api.get(`/services/${serviceId}`);
    return response.data;
}
export const createService=async(serviceData)=>{
      const response= await api.post('/services/',serviceData);
      return response.data;
}
export const updateService=async(serviceId,serviceData)=>{
    const response= await api.put(`/services/${serviceId}`,serviceData);
    return response.data;
}
export const deleteService=async(serviceId)=>{
    const response= await api.delete(`/services/${serviceId}`);
    return response.data;
}
export const getServicesByProfessional=async()=>{
    const response= await api.get('/services/professionnel/me');
    return response.data;
}
