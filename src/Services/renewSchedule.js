import api from '../baseUrlTake';
import guid from '../utils/guid';
export default async ( data) => {
   const chave = data.key 
   delete data.key;
    const result =  await api.post('/commands', {
        "id": guid(),
        "to": "postmaster@activecampaign.msging.net",
        "method": "merge",
        "uri": `/campaigns/${data.id}/schedule`,
        "type": "application/vnd.iris.activecampaign.campaign+json",
        "resource": data
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': chave
        }
    });

     return result;
}