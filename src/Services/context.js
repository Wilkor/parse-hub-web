import api from '../baseUrlTake';
import guid from '../utils/guid';

const SetContext = (key, identity, flowId, stateId, contract) => {

    return api.post(`https://${contract}.http.msging.net/commands`,
    {
        "id": guid(),
        "to": "postmaster@msging.net",
        "method": "set",
        "uri": `/contexts/${encodeURIComponent(identity)}/stateid@${flowId}`,
        "type": "text/plain",
        "resource": stateId
      }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

const SetMasterState = (key, botId, identity, contract) => {

    
    return api.post(`https://${contract}.http.msging.net/commands`,{
    "id": guid(),
    "to": "postmaster@msging.net",
    "method": "set",
    "uri":`/contexts/${encodeURIComponent(identity)}/master-state`,
    "type": "text/plain",
    "resource": `${botId}@msging.net`
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });

}
export default {SetContext, SetMasterState}

