import api from '../baseUrl';

const Get = (cpf) => {

  return api.post(`/v2/api-protesto-br/consultar/${cpf}`, {} ,{
      headers: {
        'Content-Type': 'application/json'
      }});
}



  export default {Get};