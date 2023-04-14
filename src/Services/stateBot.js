import api from '../baseUrlNotification';

export default (auth, shortName, accessKey) => {

  api.setHeaders({
    'Content-Type': 'application/json',
    'identifier': accessKey,
    'accessKey': shortName,
    'authorization': auth
  })



  return api.get('https://takebroadcast.cs.blip.ai/api/v2/Flow/states');
}