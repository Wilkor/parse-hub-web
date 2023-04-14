import api from '../baseUrlTake';
import guid from  '../utils/guid';
export default (key) => {

  return api.post('/commands',{

    "id": guid(),
    "to": "postmaster@wa.gw.msging.net",
    "method": "get",
    "uri": "/message-templates"
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': key
      }});
}