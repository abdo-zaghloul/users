import axios from "axios";

 
const Url = 'https://ecommerce.routemisr.com/api/v1/';
 
const axiosApi = axios.create({
  baseURL: Url, });

 
axios.defaults.withCredentials = true;
 

export default axiosApi;
export const apiUrl = Url;
