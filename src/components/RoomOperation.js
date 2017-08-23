import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * ルーム一覧表示部品
 */
class RoomOperation extends Component {
  render() {
    const { room, user, history, createRoom } = this.props;
    console.log(room);
    return (
      <div>
        <RaisedButton
          label="Create"
          secondary={true}
          onTouchTap={() => createRoom(user)}
          style={{ marginRight: 100, marginTop: 10, marginBottom: 10 }}
        />
        <RaisedButton
          label="Delete"
          primary={true}
          disabled={room === undefined}
          onTouchTap={() => console.log(`/${room.id}`)}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
      </div>
    );
  }
}

RoomOperation.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  createRoom: PropTypes.func.isRequired,
  removeRoom: PropTypes.func.isRequired,
};

export default RoomOperation;