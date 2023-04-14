import api from '../baseUrlTake';
import guid from  '../utils/guid';
export default (key) => {

  return api.post('/commands',{

    "id": guid(),
    "to": "postmaster@desk.msging.net",
    "method": "get",
    "uri": "/monitoring/teams?version=2"
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': key
      }});
}