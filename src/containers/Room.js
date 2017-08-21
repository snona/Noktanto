import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';

import LayoutAction from '../actions/LayoutAction';
import GridArea from '../components/GridArea';
import LayoutsStore from '../stores/LayoutsStore';

/**
 * プレイ画面の統括
 */
class _Room extends Component {
  static getStores() {
    return [LayoutsStore];
  }

  static calculateState() {
    return {
      layouts: LayoutsStore.getState().toJS(),
    };
  }

  render() {
    const { history, roomId } = this.props;
    return (
      <GridArea
        layouts={this.state.layouts}
        setLayouts={layouts => LayoutAction.setLayouts(layouts)}
        roomId={roomId}
        history={history}
      />
    );
  }
}
_Room.protoType = {
  roomId: PropTypes.string.isRequired,
};
const Room = Container.create(_Room);
export default Room;