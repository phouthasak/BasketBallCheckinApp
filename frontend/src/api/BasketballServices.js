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

  getAllEvents() {
    return this._get('/api/event/getEvents').then(this._json);
  }

  createNewEvent(formData) {
    return this._postWithFormData('/api/event/createEvent', formData);
  }
}

export default new BasketballServices();