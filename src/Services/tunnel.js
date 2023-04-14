import api from '../baseUrlTake';
import guid from '../utils/guid';

export default  (key, identity) => {

    return api.post('/commands', {
        "id": guid(),
        "to": "pontoparserouterwhatsapp@tunnel.msging.net",
        "method": "get",
        "uri": `/tunnels/${identity}`
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}