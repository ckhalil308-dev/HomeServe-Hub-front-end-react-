import api from './AxiosInstance';

export const getUsers = async (search,page)=>{
    const response = await api.get(`/users/all/?Search=${search}&page=${page}`);
    return response.data;
}
export const getPros=async(search,page)=>{
  
    const response = await api.get(`/users/pros?Search=${search}&page=${page}`);
    return response.data;
}
export const getClients=async(search,page)=>{
     
    const response = await api.get(`/users/clients?Search=${search}&page=${page}`);
    return response.data;
}
export const GetMe=async()=>{
    const response = await api.get('/users/me');
    return response.data;

}
export const getUserById=async(userId)=>{
    const response = await api.get(`/users/${userId}`);
    return response.data;
}
export const deleteUser=async(userId)=>{
    const response = await api.delete(`/users/${userId}`);
    return response.data;
}
export const updateMe=async(userData)=>{
    const response = await api.put('/users/update-me',userData);
    return response.data;
}
export const  ChangePassword=async(passwordData)=>{
    const response = await api.put('/users/change-password',passwordData);
    return response.data;
}
export const verifyProfessional=async(proId)=>{
    const response = await api.put(`/users/verify-professional/${proId}`);
    return response.data;
}
export const BanUser=async(userId)=>{
    const response = await api.put(`/users/ban-user/${userId}`);
    return response.data;
}
export const unBanUser=async(userId)=>{
    const response = await api.put(`/users/unban-user/${userId}`);
    return response.data;
}
export const getBannedUsers=async(search,page)=>{
    const response = await api.get(`/users/BannedUsers/?Search=${search}&page=${page}`);
    return response.data;
}
export const ModifyUsersByAdmin=async(userId,userData)=>{
    const response = await api.put(`/users/modify-user/${userId}`,userData);
    return response.data;
}



export default {getUsers,getPros,getClients,getUserById,deleteUser,GetMe,updateMe,ChangePassword,verifyProfessional,BanUser,unBanUser,getBannedUsers,ModifyUsersByAdmin};