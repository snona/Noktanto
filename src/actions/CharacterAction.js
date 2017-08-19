import AppDispatcher from '../dispatcher/AppDispatcher';
import { piecesRef, mapConfigRef } from '../firebase';

class CharacterAction {
  static listenConfig() {
    // mapConfigRef.on('child_added', (snapshot) => this.setConfig(snapshot.val()));
    // mapConfigRef.on('child_changed', (snapshot) => this.setConfig(snapshot.val()));
  }

  static sendConfig(config) {
    // mapConfigRef.set({ 'map_config': config });
    this.setConfig(config);
  }

  static setConfig(config) {
    // const image = new Image();
    // image.src = config.url;
    // config.backImage = image;
    // config.x = Number(config.x);
    // config.y = Number(config.y);
    // config.size = Number(config.size);
    // AppDispatcher.dispatch({
    //   type: 'set_character',
    //   character: config,
    // });
  }
}
export default CharacterAction;
