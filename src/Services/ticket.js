import api from '../baseUrlTake';
import guid from '../utils/guid';

const CreateTicket =   (key, user, team, contract ) => {

    return api.post(`https://${contract}.http.msging.net/commands`, {

        "id": guid(),
        "to": "postmaster@desk.msging.net",
        "method": "set",
        "uri": "/tickets",
        "type": "application/vnd.iris.ticket+json",
        "resource": {
            "customerIdentity": user,
            "team": team
        }

    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

const TicketOpen = (key, contract) => {

    return api.post(`https://${contract}.http.msging.net/commands`, {
        "id": guid(),
        "to": "postmaster@desk.msging.net",
        "method": "get",
        "uri": "/monitoring/open-tickets?version=2"
      }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

const TicketWaiting = (key, contract) => {

    return api.post(`https://${contract}.http.msging.net/commands`, {
        "id": guid(),
        "to": "postmaster@desk.msging.net",
        "method": "get",
        "uri": "/monitoring/waiting-tickets?version=2"
      }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}

const TicketClose =   (key, ticketId, contract) => {

    return api.post(`https://${contract}.http.msging.net/commands`, {
        "id": guid(),
        "to": "postmaster@desk.msging.net",
        "method": "set",
        "uri": "/tickets/change-status",
        "type": "application/vnd.iris.ticket+json",
        "resource": {
            "id": ticketId,
            "status": "ClosedAttendant",
            "tags": ["Transferência de ticket"]
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        }
    });
}
const TransferTicket = (key, ticketId, team, contract) => {

        return api.post(`https://${contract}.http.msging.net/commands`,  {
            "id": guid(),
            "to": "postmaster@desk.msging.net",
            "method": "set",
            "uri": `/tickets/${ticketId}/transfer`,
            "type": "application/vnd.iris.ticket+json",
            "resource": {
                "team": team
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': key
            }
        });
    }

   


export default {CreateTicket, TicketOpen, TicketClose, TransferTicket, TicketWaiting}