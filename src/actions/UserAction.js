import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { firebaseAuth, usersRef } from '../firebase';

/**
 * ユーザに関する操作
 */
class UserAction {

  /**
   * ユーザ認証(匿名)を行う
   */
  static signIn() {
    firebaseAuth.signInAnonymously().catch(error => {
      console.log(error);
    });
    firebaseAuth.onAuthStateChanged(user => {
      if (user !== null) {
        const uid = user.uid;
        this._setUserId(uid);
        usersRef.child(`${uid}`).on('value', user => {
          if (user.val() !== null) {
            this._receiveUser(user.key, user.val());
          }
        });
      }
    });
  }

  static _sendUser(user) {
    console.log(user);
    const uid = user.id;
    user.id = null;
    usersRef.child(`${uid}`).set(user);
  }

  static _receiveUser(id, user) {
    AppDispatcher.dispatch({
      type: ActionTypes.User.RECEIVE,
      id,
      user,
    });
  }

  static _setUserId(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.User.id.SET,
      id,
    });
  }

  static loginRoom(room, user) {
    user.rooms[room.id] = true;
    if (room.authentication !== undefined) {
      user.authentications[room.authentication] = true;
    }
    this._sendUser(user);
  }
}
export default UserAction;