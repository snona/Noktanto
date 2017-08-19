import axios from 'axios';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BCDiceAPI from '../constants/BCDiceAPI';

class DiceBotAction {
  static _request(uri, params = {}) {
    console.log(uri, params);
    const url = BCDiceAPI.URL + uri;
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
    this._request(BCDiceAPI.uri.SYSTEMS).then(response => {
      const systems = response.data.systems;
      AppDispatcher.dispatch({
        type: ActionTypes.Systems.SET,
        systems,
      });
    }).catch(err => {
    });
  }

  static getSystem(system) {
    const param = { system };
    this._request(BCDiceAPI.uri.SYSTEM, param).then(response => {
      const system = response.data.systeminfo;
      AppDispatcher.dispatch({
        type: ActionTypes.System.SET,
        system,
      });
    }).catch(err => {
    });
  }

  static getDiceRoll(system, text) {
    const param = { system, command: text };
    return new Promise(resolve => {
      this._request(BCDiceAPI.uri.DICE, param).then(response => {
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
