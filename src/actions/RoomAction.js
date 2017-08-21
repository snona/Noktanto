import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { roomsRef } from '../firebase';

/**
 * 認証に関する操作
 */
class RoomAction {

  /**
   * ユーザ認証(匿名)を行う
   */
  static listenRooms() {
    roomsRef.on('child_added', (snapshot) => this.setRoom(snapshot.key, snapshot.val()));
  }

  static dbToStore(key, room) {
    room.id = key;
    return room;
  }

  static storeToDB(room) {
    return room;
  }

  static setRoom(key, room) {
    room.id = key;
    AppDispatcher.dispatch({
      type: ActionTypes.Rooms.ADD,
      room,
    });
  }
}
export default RoomAction;