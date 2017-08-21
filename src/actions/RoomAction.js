import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { roomsRef, authenticationsRef } from '../firebase';

import UserAction from '../actions/UserAction';

/**
 * 認証に関する操作
 */
class RoomAction {

  /**
   * ユーザ認証(匿名)を行う
   */
  static listenRooms() {
    this.initRooms();
    roomsRef.on('child_added', (snapshot) => this.addRoom(snapshot.key, snapshot.val()));
    roomsRef.on('child_removed', (snapshot) => this.removeRoom(snapshot.key, snapshot.val()));
  }

  static unListenRooms() {
    roomsRef.off();
  }

  static dbToStore(key, room) {
    room.id = key;
    return room;
  }

  static storeToDB(room) {
    return room;
  }

  static initRooms() {
    AppDispatcher.dispatch({
      type: ActionTypes.Rooms.INIT,
    });
  }

  static addRoom(key, room) {
    room.id = key;
    AppDispatcher.dispatch({
      type: ActionTypes.Rooms.ADD,
      room,
    });
  }

  static removeRoom(key, room) {
    room.id = key;
    AppDispatcher.dispatch({
      type: ActionTypes.Rooms.REMOVE,
      room,
    });
  }

  static checkRoomPassword(room, password) {
    authenticationsRef.child(room.id).once('value').then(result => {
      return result.val() === password;
    });
  }

  static loginRoom(room, user, name, history) {
    this.setRoom(room);
    // ユーザ
    history.push(`/${room.id}`);
  }

  static setRoom(room) {
    AppDispatcher.dispatch({
      type: ActionTypes.Room.SET,
      room,
    });
  }

  static createRoom(room, user, name, history) {
    // 部屋を作成する処理
    roomsRef.push(room);
  }

  static deleteRoom(room) {
    console.log(room);
    // 部屋を削除する処理
    roomsRef.child(room.id).remove()
  }
}
export default RoomAction;