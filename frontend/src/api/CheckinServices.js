import BaseApi from './BaseApi';

class CheckinServices extends BaseApi {
  getAllUsers() {
    return this._get('/api/ballers/getBallers').then(this._json);
  }

  getAllEvents() {
    return this._get('/api/event/getEvents').then(this._json);
  }

  createNewEvent(jsonObject) {
    return this._post('/api/event/createEvent', jsonObject);
  }
}