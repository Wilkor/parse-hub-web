import api from '../baseUrl';

const Create = (body) => {

  return api.post('/v2/api-hub/create', body ,{
      headers: {
        'Content-Type': 'application/json'
      }});
}

const List = (user) => {

    return api.get(`/v2/api-hub/list/${user}`);
  }

  export default {Create, List};