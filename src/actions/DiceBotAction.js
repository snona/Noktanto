import axios from 'axios';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BCDiceAPI from '../constants/BCDiceAPI';

/**
 * BCDiceAPIに関する操作
 */
class DiceBotAction {

  /**
   * APIと通信
   * @param {string} uri 通信先URI
   * @param {Object} [params={}] 通信先への送信クエリ
   * @return {Promise<Object, Object>} 成功, または失敗結果をPromiseで返却
   */
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
      }).then((response) => { // 成功時
        console.log(response);
        resolve(response);
      }).catch((err) => { // 失敗時
        console.log(err);
        reject(err);
      });
    });
  }

  /**
   * システム一覧を取得
   */
  static getSystems() {
    this._request(BCDiceAPI.uri.SYSTEMS).then(response => {
      const systems = response.data.systems;
      AppDispatcher.dispatch({
        type: ActionTypes.Systems.SET,
        systems,
      });
    }).catch(err => {
      // 何もしない?
    });
  }

  /**
   * システム詳細を取得
   * @param {string} system 取得システム
   */
  static getSystem(system) {
    const param = { system };
    this._request(BCDiceAPI.uri.SYSTEM, param).then(response => {
      const system = response.data.systeminfo;
      AppDispatcher.dispatch({
        type: ActionTypes.System.SET,
        system,
      });
    }).catch(err => {
      // 何もしない?
    });
  }

  /**
   * DiceBotにコマンドを送信
   * @param {string} system コマンド送信先のシステム
   * @param {string} text コマンドを含んだメッセージ
   */
  static getDiceRoll(system, text) {
    const param = { system, command: text };
    return new Promise(resolve => {
      this._request(BCDiceAPI.uri.DICE, param).then(response => { // 成功時
        resolve(response.data);
      }).catch(err => { // 失敗時
        // コマンドでは無いとして処理
        resolve({ ok: false });
      });
    });
  }
}
export default DiceBotAction;
