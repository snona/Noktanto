import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher';

class DiceBotAction {
  static url = 'https://bcdice-api.herokuapp.com';
  static _request(url, params = {}) {
    console.log(url, params);
    return new Promise((resolve, reject) => {
      axios.request({
        url,
        method: 'GET',
        responseType: 'json',
        ContentType: 'application/json',
        params,
      }).then((response) => {
        console.log(response);
        resolve(response);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  static getSystems() {
    const uri = '/v1/systems';
    this._request(this.url+uri).then(response => {
      const systems = response.data.systems;
      AppDispatcher.dispatch({
        type: 'set_systems',
        systems,
      });
    }).catch(err => {
    });
  }

  static getSystem(system) {
    const uri = '/v1/systeminfo';
    const param = { system };
    this._request(this.url+uri, param).then(response => {
      const system = response.data.systeminfo;
      AppDispatcher.dispatch({
        type: 'set_system',
        system,
      });
    }).catch(err => {
    });
  }

  static getDiceRoll(system, text) {
    const uri = '/v1/diceroll';
    const param = { system, command: text };
    return new Promise(resolve => {
      this._request(this.url+uri, param).then(response => {
        if (!response.data.ok) {
          resolve({ result: text, secret: false });
        }
        resolve(response.data);
      }).catch(err => {
        resolve({ result: text, secret: false });
      });
    });
  }
}
export default DiceBotAction;
