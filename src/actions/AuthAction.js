import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { firebaseAuth } from '../firebase';

/**
 * 認証に関する操作
 */
class AuthAction {

  /**
   * ユーザ認証(匿名)を行う
   */
  static signIn() {
    firebaseAuth.signInAnonymously().catch(error => {
      console.log(error);
    });
    firebaseAuth.onAuthStateChanged(user => {
      const auth = { uid: user.uid };
      AppDispatcher.dispatch({
        type: ActionTypes.Authentication.SET,
        auth,
      });
    });
  }
}
export default AuthAction;