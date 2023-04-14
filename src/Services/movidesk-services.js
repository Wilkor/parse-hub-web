import api from '../baseUrlMovidesk';
import apiParse from '../baseUrl';

const GetMovideskServices = (key) => {

    return api.get(`/public/v1/services?token=${key}&filter=isActive eq true&isVisible eq 1`);
}

const GetPerson = (key, data) => {

     if(data.includes('@')){

         return api.get(`/public/v1/persons?token=${key}&$filter=Emails/any(e: e/email eq '${data}')`);

     } else {

        return api.get(`/public/v1/persons?token=${key}&$filter=Contacts/any(e: e/contact eq '${data}')`); 
     }

}

const CreateTicket = (key, data, ticket, router, attendance) => {

       return apiParse.post(`/v2/api-movidesk/create/${key}`, data, {headers:{
            'ticket': ticket,
            'router':router,
            'key':attendance
       }}); 
    

}

const getTicketByUser = (key, id) => {

    return api.get(`/public/v1/tickets?token=${key}&$filter=clients/any(client: client/id eq '${id}')&$select=id,status,protocol`); 

}

const getTicketById = (key, id) => {

    return apiParse.get(`/v2/api-movidesk/ticket?token=${key}&id=${id}`); 

}


export default { GetMovideskServices, GetPerson, CreateTicket, getTicketByUser, getTicketById}

