import api  from "./AxiosInstance";


export const login = async (credentials) => {
    
        const response = await api.post('/auth/login', credentials);
        return response.data;
   
};
export const register = async (userInfo) => {
    const response = await api.post('/auth/register', userInfo);
    return response.data;
}
export default  {login,register};