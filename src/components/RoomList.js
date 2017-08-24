import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import RoomLogin from '../components/RoomLogin';
import RoomOperation from '../components/RoomOperation';

/**
 * ルーム一覧表示部品
 */
class RoomList extends Component {
  componentWillMount() {
    this.setState({
      selectedRoom: undefined,
    });
  }

  _selectRow = (selectedRows) => {
    const { rooms } = this.props;
    if (selectedRows.length === 0) {
      this.setState({ selectedRoom: undefined });
    } else {
      this.setState({ selectedRoom: rooms[selectedRows[0]] });
    }
  };

  _createRoomTitl = () => {
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

  _loginRoom = (name) => {
    const { selectedRoom } = this.state;
    const { user, history, loginRoom } = this.props;
    loginRoom(selectedRoom, user, name, history);
  };

  _checkRoomPassword = (password) => {
    const { selectedRoom } = this.state;
    const { checkRoomPassword } = this.props;
    return checkRoomPassword(selectedRoom, password);
  };

  _createRoom = (room, name, password) => {
    const { createRoom, user, history } = this.props;
    createRoom(room, user, name, history, password);
  };

  _deleteRoom = () => {
    const { selectedRoom } = this.state;
    const { deleteRoom } = this.props;
    deleteRoom(selectedRoom);
    this.setState({ selectedRoom: undefined });
  };

  render() {
    const { selectedRoom } = this.state;
    const { rooms, user } = this.props;
    const roomTitle = this._createRoomTitle;
    const roomListHeader = this._createRoomListHeader();
    const roomListBody = this._createRoomListBody(rooms, selectedRoom);
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
          <TableFooter
          >
            <TableRow>
              <TableRowColumn colSpan="5" style={{textAlign: 'center' }}>
                <RoomLogin
                  room={selectedRoom}
                  user={user}
                  loginRoom={this._loginRoom}
                  checkRoomPassword={this._checkRoomPassword}
                  createRoom={this._createRoom}
                  deleteRoom={this._deleteRoom}
                />
              </TableRowColumn>
            </TableRow>
            {/* <TableRow>
              <TableRowColumn colSpan="5" style={{textAlign: 'center'}}>
                <RoomOperation
                  room={selectedRoom}
                  user={user}
                  history={history}
                  createRoom={(room) => createRoom(room)}
                  removeRoom={(room) => removeRoom(room)}
                />
              </TableRowColumn>
            </TableRow> */}
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
  history: PropTypes.object.isRequired,
  loginRoom: PropTypes.func.isRequired,
  checkRoomPassword: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
};

export default RoomList;