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
        this.setUserId(uid);
        usersRef.child(`${uid}/name`).once('value', name => {
          if (name.val() !== null) {
            this.setUserName(name.val());
          }
        });
      }
    });
  }

  static setUserId(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.User.id.SET,
      id,
    });
  }

  static setUserName(name) {
    AppDispatcher.dispatch({
      type: ActionTypes.User.name.SET,
      name,
    });
  }

  static loginRoom(room, user) {
    // name, room の許可を追加
  }
}
export default UserAction;