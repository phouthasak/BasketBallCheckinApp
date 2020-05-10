import BaseApi from './BaseApi';

class BasketballServices extends BaseApi {
  getPlayers() {
    return this._get('/api/player/getPlayers').then(this._json);
  }

  createNewPlayer(jsonObject) {
    return this._post('/api/player/createPlayer', jsonObject);
  }

  getAllLocations() {
    return this._get('/api/event/getLocations').then(this._json);
  }

  getEventById(id) {
    return this._get('/api/event/getEvent?eventId=' + id).then(this._json);
  }

  getEvents() {
    return this._get('/api/event/getEvents').then(this._json);
  }

  deleteEventById(jsonObject) {
    return this._post('/api/event/deleteEvent', jsonObject);
  }

  createNewEvent(formData) {
    return this._postWithFormData('/api/event/createEvent', formData);
  }

  postCheckIns(jsonObject) {
    return this._post('/api/event/checkIn', jsonObject);
  }
}

export default new BasketballServices();