import api from '../baseUrl';

export default (botname, token) => {

  return api.post('/v2/api-heavy/resources',{
    "botname": botname
  },{
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      }});
}