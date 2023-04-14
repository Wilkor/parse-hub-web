import api from '../baseUrlTake';
import guid from '../utils/guid';

const CreateContact = (key, botId, resource) => {

    return api.post('/commands',
        {
            "id": guid(),
            "to": `${botId}@crm.msging.net`,
            "method": "set",
            "uri": "/contacts",
            "type": "application/vnd.lime.contact+json",
            resource
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

const GetContact = (key, identity, botId) => {

    return api.post('/commands',{  
        "id": guid(),
        "to": `${botId}@crm.msging.net`,
        "method": "get",
        "uri": `/contacts/${identity}`
      }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

const GetContactFilter =  (key, phone) => {

    return api.post('/commands',{
        "method": "get",
        "uri": `/contacts?$skip=0&$take=100&$filter=(source%20ne%20'blip.ai'%20or%20source%20eq%20null)%20and%20(substringof('${phone}'%2Cphonenumber))`,
        "id": "1234238434"
      }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

export default {CreateContact, GetContact, GetContactFilter}
