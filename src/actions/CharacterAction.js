import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { charactersRef } from '../firebase';

/**
 * キャラクタに関わる操作
 */
class CharacterAction {

  /**
   * キャラクタの追加を自動読込み
   */
  static listenConfig() {
    charactersRef.on('child_added', (snapshot) => this.addCharacter(snapshot.key, snapshot.val()));
  }

  /**
   * 設定値からキャラクタを作成
   * @param {Object} config キャラクタの設定値
   * @return {Object} キャラクタ情報
   */
  static _createCharacter(config) {
    console.log(config);
    return config;
  }

  /**
   * キャラクタ情報を送信
   * @param {Object} config キャラクタ情報
   */
  static sendConfig(config) {
    charactersRef.push(this._createCharacter(config));
    this.initConfig();  // 作成後は初期値に戻す
  }

  /**
   * キャラクタ情報を初期値に設定
   */
  static initConfig() {
    AppDispatcher.dispatch({
      type: ActionTypes.Character.INIT,
    });
  }

  // Todo
  // FireBase <-> Store の変換Methodを各地に作成する

  /**
   * キャラクタをStoreに追加
   * @param {string} id キャラクタのID
   * @param {Object} character 追加するキャラクタ情報
   */
  static addCharacter(id, character) {
    character.id = id;
    AppDispatcher.dispatch({
      type: ActionTypes.Characters.ADD,
      character,
    });
  }
}
export default CharacterAction;
