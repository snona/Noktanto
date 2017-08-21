import firebase from 'firebase';
import { firebaseConfig } from '../firebase/config.js';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const firebaseDb = firebaseApp.database();
export const usersRef = firebaseDb.ref('users') /** ユーザ一覧 */
export const roomsRef = firebaseDb.ref('rooms') /** ルーム一覧 */
export const channelsRef = firebaseDb.ref('channels') /** チャンネル一覧 */
export const charactersRef = firebaseDb.ref('characters') /** 発言キャラ一覧 */
export const piecesRef = firebaseDb.ref('pieces') /** 駒一覧 */
export const messagesRef = firebaseDb.ref('messages') /** メッセージ一覧 */
export const memosRef = firebaseDb.ref('memos') /** メモ一覧 */
export const palletsRef = firebaseDb.ref('pallets') /** パレット一覧 */
export const configsRef = firebaseDb.ref('configs') /** 設定一覧 */
export const authenticationsRef = firebaseDb.ref('authentications') /** 認証一覧 */
