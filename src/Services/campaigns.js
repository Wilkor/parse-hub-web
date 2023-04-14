import api from '../baseUrlTake';
import guid from '../utils/guid';
export default async (key, id) => {

    const result =  await api.post('/commands', {
        "id": guid(),
        "to": "postmaster@activecampaign.msging.net",
        "method": "get",
        "uri": `/campaigns/${id}`
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });

     result.data.resource["key"] = key;

     return result;
}