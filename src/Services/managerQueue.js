import api from '../baseUrlTake';
import guid from '../utils/guid';

const GetQueue = (key) => {

    return api.post('/commands',
    {
        "id": guid(),
        "to": "postmaster@desk.msging.net",
        "method": "get",
        "uri": "/attendance-queues/a1transferenciaentrebots"
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

const SetQueue = (key, botId) => {

    
    return api.post('/commands',{
        "id": guid(),
        "to": "postmaster@desk.msging.net",
        "method": "set",
        "uri": "/attendance-queues",
        "type": "application/vnd.iris.desk.attendancequeue+json",
        "resource": {
            "ownerIdentity": `${botId}@msging.net`,
            "name": "a1-transferencia-entre-bots",
            "isActive": true,
            "Priority": 0
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });

}

const SetRules = (key,data, equipes, botId) => {

    
    return api.post('/commands',{
        "id": guid(),
        "to": "postmaster@desk.msging.net",
        "method": "set",
        "uri": "/rules",
        "type": "application/vnd.iris.desk.rule+json",
       "resource": {
            "id": "a1transferenciaentrebots",
            "ownerIdentity": `${botId}@msging.net`,
            "title": "Transferencia entre bots",
            "team": "a1-transferencia-entre-bots",
            "relation": "Contains",
            "isActive": true,
            "conditions": [
                {
                    "property": "Message",
                    "relation": "Contains",
                    "values": equipes
                }
            ],
            "operator": "Or",
            "priority": 3,
            "storageDate": data.storageDate,
            "queueId": data.uniqueId
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });

}
export default {GetQueue, SetQueue, SetRules}

