import { create } from 'apisauce';
const contract =  localStorage.getItem('contract-plugin')
const api = create({
  baseURL: `https://${contract}.http.msging.net`
});


export default api;
