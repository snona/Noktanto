import firebase from 'firebase';
import { firebaseConfig } from '../firebase/config.js';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();
export const messagesRef = firebaseDb.ref('messages') /** チャット履歴 */
export const secretMessagesRef = firebaseDb.ref('secret_messages') /** チャット履歴 */
export const piecesRef = firebaseDb.ref('pieces') /** 駒配置 */
