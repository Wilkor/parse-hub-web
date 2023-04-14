import api from '../baseUrlTake';
import guid from '../utils/guid';

const SendMessasge = (team, key, botId, originator, contract) => {

    return api.post(`https://${contract}.http.msging.net/messages`,
    {
        "id": guid(),
        "to": `${botId}@tunnel.msging.net/${originator}`,
        "type": "text/plain",
        "content": `#${team}`
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

const SendMessasge2 = (team, key, botId, originator) => {


    return api.post('/messages',
    {
        "id": guid(),
        "to": `${botId}@tunnel.msging.net/${encodeURIComponent(originator)}`,
        "type": "text/plain",
        "content": `#${team}`
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

export default {SendMessasge, SendMessasge2}

