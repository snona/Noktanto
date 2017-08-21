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
    console.log(room, password);
    return Promise.resolve(authenticationsRef.child(`${room.authentication}/${password}`).once('value').then(result => {
      console.log(result.val());
      return result.val() !== null;
    }));
  }

  static loginRoom(room, user, name, history) {
    this.setRoom(room);
    // DBのユーザ名, auth, roomを更新
    UserAction.setUserName(name),
    history.push(`/${room.id}`);
  }

  static setRoom(room) {
    AppDispatcher.dispatch({
      type: ActionTypes.Room.SET,
      room,
    });
  }

  static createRoom(room, user, name, history, password) {
    // 部屋を作成する処理
    if (room.authentication) {
      room.authentication = authenticationsRef.push({ [password]: true }).key;
    } else {
      room.authentication = null;
    }
    room.id = roomsRef.push(room).key;
    this.loginRoom(room, user, name, history);
  }

  static deleteRoom(room) {
    console.log(room);
    // 部屋を削除する処理
    roomsRef.child(room.id).remove();
    authenticationsRef.child(room.id).remove();
  }
}
export default RoomAction;