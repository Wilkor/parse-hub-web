import api from '../baseUrl';

export default (host, botname ) => {

  return api.post('/v2/api-heavy/login/getlogin',{
    "email": !host ? `${botname}@clonebots.com` : `${host}@clonebots.com`,
    "password": !host ? botname : host
  },{
      headers: {
        'Content-Type': 'application/json'
      }});
}