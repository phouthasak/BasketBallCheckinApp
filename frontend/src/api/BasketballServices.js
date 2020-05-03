import BaseApi from './BaseApi';

class BasketballServices extends BaseApi {
  getPlayers() {
    return this._get('/api/player/getPlayers').then(this._json);
  }

  createNewPlayer(jsonObject) {
    return this._post('/api/player/createPlayer', jsonObject);
  }

  getAllEvents() {
    return this._get('/api/event/getEvents').then(this._json);
  }

  createNewEvent(jsonObject) {
    return this._post('/api/event/createEvent', jsonObject);
  }
}

export default new BasketballServices();