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
    const { history, match } = this.props;
    const roomId = match.params.roomId;
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
const Room = Container.create(_Room);
export default Room;