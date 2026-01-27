import api from './AxiosInstance';

export const getUsers = async (search,page)=>{
    const response = await api.get(`/users/all/?Search=${search}&page=${page}`);
    return response.data;
}
export const getPros=async(search,page)=>{
    const search2=search.trim();
    const response = await api.get(`/users/pros?Search=${search2}&page=${page}`);
    return response.data;
}
export const getClients=async(search,page)=>{
     const search2=search.trim();
    const response = await api.get(`/users/clients?Search=${search2}&page=${page}`);
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
export default {getUsers,getPros,getClients,getUserById,deleteUser,GetMe,updateMe,ChangePassword};