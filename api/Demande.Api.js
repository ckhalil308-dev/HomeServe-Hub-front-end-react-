import api from "./AxiosInstance";

export const getClientDemandes = async (filter, page) => {
    const response = await api.get('/demandes/client/demandes?status=' + filter+ '&page=' + page    );
    return response.data;
}
export const getProfessionalDemandes = async () => {
    const response = await api.get('/demandes/pro/demandes');
    return response.data;
}
export const createDemande = async (demandeData) => {
    const response = await api.post('/demandes/create', demandeData);
    return response.data;
}
export const updateDemandeStatus = async (demandeId, statusData) => {
    const response = await api.put(`/demandes/pro/demandes/${demandeId}/status`, statusData);
    return response.data;
}
export const getDemandeById = async (demandeId) => {
    const response = await api.get(`/demandes/pro/${demandeId}`);
    return response.data;
}
export const ProposerPrix=async(demandeId,prixData)=>{
    const response=await api.put(`/demandes/pro/offer/${demandeId}`,prixData);
    return response.data;
}
export const getAllDemandes=async(status,page)=>{
    const response=await api.get('/demandes/allDemandes/?status='+status+'&page='+page);
    return response.data;
}