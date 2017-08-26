import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { roomsRef, authenticationsRef, usersRef } from '../firebase';

import UserAction from '../actions/UserAction';
import DiceBotAction from '../actions/DiceBotAction';

/**
 * 認証に関する操作
 */
class RoomAction {

  /**
   * ユーザ認証(匿名)を行う
   */
  static listenRooms() {
    this._initRooms();
    roomsRef.on('child_added', (snapshot) => this._addRoom(snapshot.key, snapshot.val()));
    roomsRef.on('child_removed', (snapshot) => this._removeRoom(snapshot.key));
  }

  static unListenRooms() {
    roomsRef.off();
  }

  static _initRooms() {
    AppDispatcher.dispatch({
      type: ActionTypes.Rooms.INIT,
    });
  }

  static _addRoom(id, room) {
    AppDispatcher.dispatch({
      type: ActionTypes.Rooms.ADD,
      id,
      room,
    });
  }

  static _removeRoom(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.Rooms.REMOVE,
      id,
    });
  }

  static checkRoomPassword(room, password) {
    return Promise.resolve(authenticationsRef.child(`${room.authentication}/${password}`).once('value').then(result => {
      console.log(result.val());
      return result.val() !== null && result.val() === true;
    }));
  }

  static loginRoom(room, user, name, history) {
    user.name = name;
    UserAction.loginRoom(room, user);
    this._addRoomUser(room, user);
    history.push(`/${room.id}`);
  }

  static _addRoomUser(room, user) {
    room.users[user.id] = true;
    roomsRef.child(`${room.id}/users`).set(room.users);
  }

  static getRoom(roomId, userId, history) {
    roomsRef.child(roomId).on('value', (snapshot) => {
      const room = snapshot.val();
      // データが取得できない or 未許可の場合、不正なアクセス
      if (room === null || room.users === undefined || room.users[userId] === undefined) {
        history.push('/');
      } else {
        this._receiveRoom(snapshot.key, snapshot.val());
        DiceBotAction.getSystem(room.system);
      }
    });
  }

  static _receiveRoom(id, room) {
    AppDispatcher.dispatch({
      type: ActionTypes.Room.RECEIVE,
      id,
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
    const rid = room.id;
    const channels = room.channels;
    // ユーザ関連のデータを削除
    Object.keys(room.users).forEach(uid => {
      // ルーム一覧から対象を削除
      usersRef.child(`${uid}/rooms/${rid}`).remove();
      if (channels !== undefined) {
        Object.keys(channels).forEach(cid => {
          // ルーム一覧から対象を削除
          usersRef.child(`${uid}/channels/${cid}`).remove();
        });
      }
      if (room.authentication !== undefined) {
        // 認証一覧から対象を削除
        usersRef.child(`${uid}/authentications/${room.authentication}`).remove();
      }
    })
    // // チャンネル関連のデータを削除
    // channelsRef.child(rid).remove();
    // // キャラクタ
    // charactersRef.child(rid).remove();
    // // 駒
    // piecesRef.child(rid).remove();
    // // メッセージ
    // messagesRef.child(rid).remove();
    // // メモ
    // memosRef.child(rid).remove();
    // // パレット
    // palletsRef.child(rid).remove();
    // // 設定
    // configsRef.child(rid).remove();
    // // 認証
    // authenticationsRef.child(rid).remove();
    roomsRef.child(rid).remove();
  }
}
export default RoomAction;