import { SignalWifiStatusbarNull } from '@mui/icons-material';
import api from '../baseUrl';

export default (contract, token) => {

  return api.get(`/v2/api-system-extension/list?contract=${contract}`, null, { headers: { 'x-access-token': token } });
}