 import {AxiosService} from "../AxiosService"


export const getUser = () =>
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  
  export const login = async (email, password) => {
    const { data } = await AxiosService.post('api/user/login', { email, password });
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };
  export const register = async registerData =>{
    const {data} = await AxiosService.post('api/user/',registerData);
    localStorage.setItem('user',JSON.stringify(data));
    return data;
  }
  
  export const logout = () => {
      localStorage.removeItem('user');
    };
    export const updateProfile = async user => {
      const { data } = await AxiosService.put('/api/user/updateProfile', user);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    };