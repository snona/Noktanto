import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * ルーム一覧表示部品
 */
class RoomOperation extends Component {
  _createSampleRoom = () => {
    const { user } = this.props;
    return {
      name: 'Sample Room with Password',
      users: {
        [user.id]: true,
      },
      authentication: true,
      visit: false,
      system: 'Cthulhu',
    };
    // return {
    //   name: 'Sample Room',
    //   users: {
    //     [user.id]: true,
    //   },
    //   authentication: false,
    //   visit: false,
    //   system: 'Cthulhu',
    // };
  };

  _createRoom = () => {
    const { createRoom } = this.props;
    const sampleRoom = this._createSampleRoom();
    createRoom(sampleRoom, 'password');
  };

  _deleteRoom = () => {
    const { deleteRoom } = this.props;
    deleteRoom();
  };

  render() {
    const { room } = this.props;
    console.log(room);
    return (
      <div>
        <RaisedButton
          label="Create"
          secondary={true}
          onTouchTap={this._createRoom}
          style={{ marginRight: 100, marginTop: 10, marginBottom: 10 }}
        />
        <RaisedButton
          label="Delete"
          primary={true}
          disabled={room === undefined}
          onTouchTap={this._deleteRoom}
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
  createRoom: PropTypes.func.isRequired,
  removeRoom: PropTypes.func.isRequired,
};

export default RoomOperation;