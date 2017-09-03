import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import RoomLogin from '../components/RoomLogin';
import RoomCreate from '../components/RoomCreate';

/**
 * ルーム一覧表示部品
 */
class RoomList extends Component {
  componentWillMount() {
    this.setState({
      selectedRoom: undefined,
      name: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (user.name === '' && nextProps.user.name !== '') {
      this.setState({ name: nextProps.user.name });
    }
  }

  _selectRow = (selectedRows) => {
    const { rooms } = this.props;
    if (selectedRows.length === 0) {
      this.setState({ selectedRoom: undefined });
    } else {
      this.setState({ selectedRoom: rooms[selectedRows[0]] });
    }
  };

  _createRoomTitle = () => {
    return ('Select Room! and Login!');
  };

  _createRoomListHeader = () => {
    return (
      <TableRow>
        <TableHeaderColumn tooltip="The No">No</TableHeaderColumn>
        <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
        <TableHeaderColumn tooltip="The System">System</TableHeaderColumn>
        <TableHeaderColumn tooltip="The Password">Password</TableHeaderColumn>
        <TableHeaderColumn tooltip="The Visit">Visit</TableHeaderColumn>
      </TableRow>
    );
  };

  _createRoomListBody = (rooms, selectedRoom) => {
    return rooms.map((room, index) => (
      <TableRow key={index} selected={selectedRoom !== undefined && selectedRoom.id === room.id}>
        <TableRowColumn>{index}</TableRowColumn>
        <TableRowColumn>{room.name}</TableRowColumn>
        <TableRowColumn>{room.system}</TableRowColumn>
        <TableRowColumn>{room.authentication !== undefined ? 'O' : 'X'}</TableRowColumn>
        <TableRowColumn>{room.visit ? 'O' : 'X'}</TableRowColumn>
      </TableRow>
    ));
  };

  _createRoomListFooter = () => {
    const { selectedRoom, name } = this.state;
    const { user, systems } = this.props;
    return (
      <TableRow>
        <TableRowColumn style={{textAlign: 'center'}}>
        </TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
          <TextField
            floatingLabelText="User Name"
            style={{ width: 150 }}
            value={name}
            onChange={this._inputName}
          />
        </TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
          <RoomLogin
            room={selectedRoom}
            user={user}
            loginRoom={this._loginRoom}
            checkRoomPassword={this._checkRoomPassword}
          />
        </TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
          <RoomCreate
            user={user}
            createRoom={this._createRoom}
            systems={systems}
          />
        </TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
          <RaisedButton
            label="Delete"
            primary={true}
            disabled={selectedRoom === undefined}
            onTouchTap={this._deleteRoom}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
        </TableRowColumn>
      </TableRow> 
    );
  };

  _loginRoom = () => {
    const { selectedRoom, name } = this.state;
    const { user, history, loginRoom } = this.props;
    loginRoom(selectedRoom, user, name, history);
  };

  _checkRoomPassword = (password) => {
    const { selectedRoom } = this.state;
    const { checkRoomPassword } = this.props;
    return checkRoomPassword(selectedRoom, password);
  };

  _createRoom = (room, password) => {
    const { name } = this.state;
    const { createRoom, user, history } = this.props;
    createRoom(room, user, name, history, password);
  };

  _deleteRoom = () => {
    const { selectedRoom } = this.state;
    const { deleteRoom } = this.props;
    deleteRoom(selectedRoom);
    this.setState({ selectedRoom: undefined });
  };

  _inputName = (e, value) => {
    this.setState({ name: value });
  };

  render() {
    const { selectedRoom } = this.state;
    const { rooms } = this.props;
    const roomTitle = this._createRoomTitle();
    const roomListHeader = this._createRoomListHeader();
    const roomListBody = this._createRoomListBody(rooms, selectedRoom);
    const roomListFooter = this._createRoomListFooter();
    return (
      <Paper style={{ margin: 30 }}>
        <Table
          height={'300px'}
          onRowSelection={this._selectRow}
        >
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
          >
            <TableRow style={{ backgroundColor: Colors.deepPurple500 }} >
              <TableHeaderColumn colSpan="5" tooltip="Super Header" style={{textAlign: 'center', color: Colors.white}}>
                {roomTitle}
              </TableHeaderColumn>
            </TableRow>
            {roomListHeader}
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            showRowHover={true}
          >
            {roomListBody}
          </TableBody>
          <TableFooter>
            {roomListFooter}
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

RoomList.propTypes = {
  rooms: PropTypes.array.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  systems: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  loginRoom: PropTypes.func.isRequired,
  checkRoomPassword: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
};

export default RoomList;