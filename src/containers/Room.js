import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';

import LayoutAction from '../actions/LayoutAction';
import RoomAction from '../actions/RoomAction';
import GridArea from '../components/GridArea';
import LayoutsStore from '../stores/LayoutsStore';
import RoomStore from '../stores/RoomStore';
import UserStore from '../stores/UserStore';

/**
 * プレイルーム画面の統括
 */
class _Room extends Component {
  static getStores() {
    return [LayoutsStore, RoomStore];
  }

  static calculateState() {
    return {
      layouts: LayoutsStore.getState().toJS(),
      room: RoomStore.getState().toJS(),
      user: UserStore.getState().toJS(),
    };
  }

  componentWillMount() {
    const { history, match } = this.props
    const { user } = this.state;
    const roomId = match.params.roomId;
    // ID からルーム情報を取得
    RoomAction.getRoom(roomId, user.id, history);
  }

  _setLayouts = (layouts) => {
    LayoutAction.setLayouts(layouts);
  };

  render() {
    const { layouts } = this.state;
    const { history, match } = this.props;
    const roomId = match.params.roomId;
    return (
      <GridArea
        layouts={layouts}
        setLayouts={this._setLayouts}
        roomId={roomId}
        history={history}
      />
    );
  }
}
const Room = Container.create(_Room);
export default Room;