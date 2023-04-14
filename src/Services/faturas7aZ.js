import api from '../baseUrl';

const GetInvoicesByDoc = (doc, key) => {

    return api.get(`/v2/api-7az/list/${doc}/${key}`);
}

const GetInvoicesById = (id,key) => {

    return api.get(`/v2/api-7az/fatura/${id}/${key}`);
}

export default { GetInvoicesByDoc, GetInvoicesById }

