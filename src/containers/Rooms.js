import React, { Component } from 'react';
import { Container } from 'flux/utils';

import UserStore from '../stores/UserStore';
import RoomsStore from '../stores/RoomsStore';
import RoomAction from '../actions/RoomAction';
import DiceBotAction from '../actions/DiceBotAction';
import RoomList from '../components/RoomList';
import SystemsStore from '../stores/SystemsStore';

/**
 * ルーム一覧画面の統括
 */
class _Rooms extends Component {
  static getStores() {
    return [UserStore, RoomsStore, SystemsStore];
  }

  static calculateState() {
    return {
      user: UserStore.getState().toJS(),
      rooms: RoomsStore.getState().toJS(),
      systems: SystemsStore.getState().toJS(),
    };
  }

  componentWillMount() {
    // ルーム一覧の自動取得
    RoomAction.listenRooms();
    DiceBotAction.getSystems(); // BCDiceAPIのシステム一覧取得
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
    const { user, rooms, systems } = this.state;
    const { history } = this.props;
    const roomsList = Object.keys(rooms).map(key => rooms[key]);
    return (
      <div style={{ margin: 10, height: '100%' }} >
        <RoomList
          user={user}
          rooms={roomsList}
          systems={systems}
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