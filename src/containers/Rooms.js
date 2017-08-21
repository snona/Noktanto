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

  render() {
    const { history } = this.props;
    return (
      <div style={{ margin: 10, height: '100%' }} >
        <RoomList
          user={this.state.user}
          rooms={this.state.rooms}
          history={history}
        />
      </div>
    );
  }
}
const Rooms = Container.create(_Rooms);
export default Rooms;