import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { roomsRef, authenticationsRef, usersRef } from '../firebase';

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
    room.id = null;
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
    return Promise.resolve(authenticationsRef.child(`${room.authentication}/${password}`).once('value').then(result => {
      return result.val() !== null;
    }));
  }

  static loginRoom(room, user, name, history) {
    UserAction.loginRoom(room, user, name);
    this.setRoom(room);
    history.push(`/${room.id}`);
  }

  static getRoom(roomId, userId, history) {
    roomsRef.child(roomId).on('value', (snapshot) => {
      const room = snapshot.val();
      // データが取得できない or 未許可の場合、不正なアクセス
      if (room === null || room.users[userId] === undefined) {
        history.push('/');
      } else {
        const room = this.dbToStore(snapshot.key, snapshot.val());
        this.setRoom(room);
      }
    });
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
    const channels = room.channels;
    // ユーザ関連のデータを削除
    Object.keys(room.users).forEach(uid => {
      // ルーム一覧から対象を削除
      usersRef.child(`${uid}/rooms/${room.id}`).remove();
      // Object.keys(channels).forEach(cid => {
      //   // ルーム一覧から対象を削除
      //   usersRef.child(`${uid}/channels/${cid}`).remove();
      // });
      if (room.authentication !== undefined) {
        // 認証一覧から対象を削除
        usersRef.child(`${uid}/authentications/${room.authentication}`).remove();
      }
    })
    // チャンネル関連のデータを削除
    // channelsRef.child(`${room.id}`).remove();
    // // キャラクタ
    // charactersRef.child(`${room.id}`).remove();  // TODO Action.remove()を呼ぶ
    // // 駒
    // piecesRef.child(`${room.id}`).remove();  // TODO Action.remove()を呼ぶ
    // // メッセージ
    // messagesRef.child(`${room.id}`).remove();  // TODO Action.remove()を呼ぶ
    // // メモ
    // memosRef.child(`${room.id}`).remove();  // TODO Action.remove()を呼ぶ
    // // パレット
    // palletsRef.child(`${room.id}`).remove();  // TODO Action.remove()を呼ぶ
    // // 設定
    // configsRef.child(`${room.id}`).remove();  // TODO Action.remove()を呼ぶ
    // // 認証
    // authenticationsRef.child(room.id).remove();
    roomsRef.child(room.id).remove();
  }
}
export default RoomAction;