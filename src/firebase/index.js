import firebase from 'firebase';
import { firebaseConfig } from '../firebase/config.js';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();
export const messagesRef = firebaseDb.ref('messages') /** チャット履歴 */
export const charactersRef = firebaseDb.ref('characters') /** 発言キャラ */
export const piecesRef = firebaseDb.ref('pieces') /** 駒配置 */
export const configRef = firebaseDb.ref('config') /** 設定 */
