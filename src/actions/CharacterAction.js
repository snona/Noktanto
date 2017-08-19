import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { charactersRef } from '../firebase';

class CharacterAction {
  static listenConfig() {
    charactersRef.on('child_added', (snapshot) => this.addCharacter(snapshot.key, snapshot.val()));
    // mapConfigRef.on('child_changed', (snapshot) => this.setConfig(snapshot.key, snapshot.val()));
  }

  static _createCharacter(config) {
    return config;
  }

  static sendConfig(config) {
    charactersRef.push(this._createCharacter(config));
    this.initConfig();
    // this.addCharacter(config.name, config);
  }

  static initConfig() {
    AppDispatcher.dispatch({
      type: ActionTypes.Piece.INIT,
    });
  }

  // Todo
  // FireBase <-> Store の変換Methodを各地に作成する

  static addCharacter(id, character) {
    character.id = id;
    AppDispatcher.dispatch({
      type: ActionTypes.Characters.ADD,
      character,
    });
  }
}
export default CharacterAction;
