import api from '../baseUrl';

const Create = (body) => {

  console.log('create', body)

  return api.post('/v2/api-hub/schedule/create', body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const List = (user, contrato, query) => {

  return api.get(`/v2/api-hub/schedule/list/${user}/${contrato}/${query}`);
}

const Delete = (id) => {

  return api.delete(`/v2/api-hub/schedule/${id}`);
}

const DeleteSchedule = (id, token) => {

  return api.delete(`/v2/api-hub/schedule/campaings/${id}`, null, {
    headers: {
      "key": token
    }
  });
}

export default { Create, List, Delete, DeleteSchedule };