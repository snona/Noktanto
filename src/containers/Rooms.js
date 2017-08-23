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
    // ルーム一覧の自動取得
    RoomAction.listenRooms();
  }

  componentWillUnmount() {
    // ルーム一覧の自動取得停止
    RoomAction.unListenRooms();
  }

  _loginRoom = (room, user, name, history) => {
    RoomAction.loginRoom(room, user, name, history);
  };

  _checkRoomPassword = (room, password) => {
    return RoomAction.checkRoomPassword(room, password);
  };

  _createRoom = (room, user, name, history, password) => {
    RoomAction.createRoom(room, user, name, history, password);
  };

  _deleteRoom = (room) => {
    RoomAction.deleteRoom(room);
  };

  render() {
    const { user, rooms } = this.state;
    const { history } = this.props;
    const roomsList = Object.keys(rooms).map(key => rooms[key]);
    return (
      <div style={{ margin: 10, height: '100%' }} >
        <RoomList
          user={user}
          rooms={roomsList}
          history={history}
          loginRoom={this._loginRoom}
          checkRoomPassword={this._checkRoomPassword}
          createRoom={this._createRoom}
          deleteRoom={this._deleteRoom}
        />
      </div>
    );
  }
}
const Rooms = Container.create(_Rooms);
export default Rooms;