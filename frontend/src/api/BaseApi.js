export default class BaseApi {
  _json(response) {
    return response.json();
  }

  _get(url) {
    return fetch(url, {
      method: 'GET'
    });
  }

  _post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }
}