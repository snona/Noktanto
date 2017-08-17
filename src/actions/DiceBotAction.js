import jsonp from 'jsonp';
import AppDispatcher from '../dispatcher/AppDispatcher';

class DiceBotAction {
  static url = 'https://bcdice-api.herokuapp.com';
  static _request(url, param = {}) {
    console.log(url, param);
    const query = Object.keys(param).map(key => `${key}=${encodeURIComponent(param[key])}`).join('&');
    console.log(`${url}?${query}`);
    return new Promise(resolve => {
      jsonp(`${url}?${query}`, null, (err, data) => {
        if (err) {
          console.log(err);
          resolve(err);
        }
        console.log(data);
        resolve(data);
      })
    });
  }

  static getSystems() {
    const uri = '/v1/systems';
    this._request(this.url+uri).then(response => {
      const systems = response.systems;
      AppDispatcher.dispatch({
        type: 'set_systems',
        systems,
      });
    });
  }

  static getSystem(system) {
    const uri = '/v1/systeminfo';
    const param = { system };
    this._request(this.url+uri, param).then(response => {
      const system = response.systeminfo;
      AppDispatcher.dispatch({
        type: 'set_system',
        system,
      });
    });
  }

  static getDiceRoll(system, text) {
    const uri = '/v1/diceroll';
    const param = { system, command: text };
    return new Promise(resolve => {
      this._request(this.url+uri, param).then(response => {
        if (!response.ok) {
          resolve({ result: text, secret: false });
        }
        resolve(response);
      });
    });
  }
}
export default DiceBotAction;
