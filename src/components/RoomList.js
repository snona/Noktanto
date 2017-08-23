import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import RoomLogin from '../components/RoomLogin';
import RoomOperation from '../components/RoomOperation';

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

  _selectRow(selectedRows, tableData) {
    if (selectedRows.length === 0) {
      this.setState({ selectedRoom: undefined });
    } else {
      this.setState({ selectedRoom: tableData[selectedRows[0]] });
    }
  }

  _createRoomTitle() {
    return ('Select Room! and Login!');
  }

  _createRoomListHeader() {
    return (
      <TableRow>
        <TableHeaderColumn tooltip="The No">No</TableHeaderColumn>
        <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
        <TableHeaderColumn tooltip="The System">System</TableHeaderColumn>
        <TableHeaderColumn tooltip="The Password">Password</TableHeaderColumn>
        <TableHeaderColumn tooltip="The Visit">Visit</TableHeaderColumn>
      </TableRow>
    );
  }

  _createRoomListBody(rooms, selectedRoom) {
    return rooms.map((room, index) => (
      <TableRow key={index} selected={selectedRoom !== undefined && selectedRoom.id === room.id}>
        <TableRowColumn>{index}</TableRowColumn>
        <TableRowColumn>{room.name}</TableRowColumn>
        <TableRowColumn>{room.system}</TableRowColumn>
        <TableRowColumn>{room.authentication !== undefined ? 'O' : 'X'}</TableRowColumn>
        <TableRowColumn>{room.visit ? 'O' : 'X'}</TableRowColumn>
      </TableRow>
    ));
  }

  render() {
    const { selectedRoom } = this.state;
    const { rooms, user, history, loginRoom, createRoom, deleteRoom, checkRoomPassword } = this.props;
    const roomTitle = this._createRoomTitle();
    const roomListHeader = this._createRoomListHeader();
    const roomListBody = this._createRoomListBody(rooms, selectedRoom);
    return (
      <Paper style={{ margin: 30 }}>
        <Table
          height={'300px'}
          onRowSelection={(v) => this._selectRow(v, rooms)}
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
                  history={history}
                  loginRoom={(room, user, name, history) => loginRoom(room, user, name, history)}
                  checkRoomPassword={(room, password) => checkRoomPassword(room, password)}
                  createRoom={(room, user, name, history, password) => createRoom(room, user, name, history, password)}
                  deleteRoom={(room) => { deleteRoom(room); this.setState({selectedRoom: undefined}); }}
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