import React, { Component } from 'react';
import { Container } from 'flux/utils';

import UserStore from '../stores/UserStore';
import UserAction from '../actions/UserAction';
import RoomsStore from '../stores/RoomsStore';
import RoomAction from '../actions/RoomAction';
import RoomList from '../components/RoomList';

/**
 * ルーム一覧画面の統括
 */
class _Rooms extends Component {
  static getStores() {
    return [UserStore, RoomsStore];
  }

  static calculateState() {
    return {
      user: UserStore.getState().toJS(),
      rooms: RoomsStore.getState().toJS(),
    };
  }

  componentWillMount() {
    RoomAction.listenRooms();  // ルーム一覧の自動取得
  }

  componentWillUnmount() {
    RoomAction.unListenRooms();  // ルーム一覧の自動取得停止
  }

  render() {
    const { user, rooms } = this.state;
    const { history } = this.props;
    const newRooms = Object.keys(rooms).map(key => rooms[key]);
    return (
      <div style={{ margin: 10, height: '100%' }} >
        <RoomList
          user={user}
          rooms={newRooms}
          history={history}
          loginRoom={(room, user, name, history) => RoomAction.loginRoom(room, user, name, history)}
          checkRoomPassword={(room, password) => RoomAction.checkRoomPassword(room, password)}
          createRoom={(room, user, name, history) => RoomAction.createRoom(room, user, name, history)}
          deleteRoom={(room) => RoomAction.deleteRoom(room)}
        />
      </div>
    );
  }
}
const Rooms = Container.create(_Rooms);
export default Rooms;