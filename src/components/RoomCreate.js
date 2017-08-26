import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

import SelectDiceSystem from '../components/SelectDiceSystem';

/**
 * ルーム一覧表示部品
 */
class RoomCreate extends Component {
  componentWillMount() {
    this.setState({
      room: {
        name: '',
        system: '',
        visit: false,
      },
      password: '',
      open: false,
    });
  }

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

  _closeDialog = () => {
    this.setState({ open: false, room: {}, password: '' });
  };

  _inputRoomName = (e, value) => {
    const { room } = this.state;
    room.name = value;
    this.setState({ room });
  };

  _selectRoomSystem = (system) => {
    const { room } = this.state;
    room.system = system;
    this.setState({ room });
  };

  _inputPassword = (e, value) => {
    this.setState({ password: value });
  };
  
  _selectRoomVisit = (e, value) => {
    const { room } = this.state;
    room.visit = value;
    this.setState({ room });
  };

  _createRoomDialog = () => {
    const { open, room, password } = this.state;
    const { systems } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this._closeDialog}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this._createRoom}
      />,
    ];
    const system = { gameType: room.system };
    return (
      <Dialog
        title={'Create Room'}
        actions={actions}
        modal={false}
        contentStyle={{ width: 500 }}
        open={open}
        onRequestClose={this._closeDialog}
        autoScrollBodyContent={true}
      >
        <TextField
          floatingLabelText="Name"
          style={{ width: 150 }}
          value={room.name}
          onChange={this._inputRoomName}
        />
        <SelectDiceSystem
          systems={systems}
          system={system}
          selectSystem={this._selectRoomSystem}
        />
        <TextField
          floatingLabelText="Password"
          style={{ width: 150 }}
          type="password"
          value={password}
          onChange={this._inputPassword}
        />
        <Checkbox
          label="Visit"
          checked={room.visit}
          onCheck={this._selectRoomVisit}
        />
      </Dialog>
    );
  };

  _createRoom = () => {
    const { room, password } = this.state;
    const { createRoom, user } = this.props;
    room.users = [{ [user.id]: true }];
    room.authentication = password !== '';
    createRoom(room, password);
  };

  _openDialog = () => {
    this.setState({ open: true });
  };

  render() {
    const roomDialog = this._createRoomDialog();
    return (
      <span>
        <RaisedButton
          label="Create"
          secondary={true}
          onTouchTap={this._openDialog}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        {roomDialog}
      </span>
    );
  }
}

RoomCreate.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  createRoom: PropTypes.func.isRequired,
  systems: PropTypes.array.isRequired,
};

export default RoomCreate;