import api from '../baseUrl';

export default (botname) => {

  return api.get(`/v2/api-hub/schedule/list/config/${botname}`);
}