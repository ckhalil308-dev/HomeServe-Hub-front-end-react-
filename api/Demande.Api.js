import api from "./AxiosInstance";

export const getClientDemandes = async (filter) => {
    const response = await api.get('/demandes/client/demandes?status=' + filter);
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