import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
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

  render() {
    console.log(this.props);
    const { rooms, user, history } = this.props;
    const tableData = [];

    for (let i = 0; i< 10; i++) {
      tableData.push({ id: i, name: 'name', system: 'system', password: true, visit: false });
    }
    return (
      <Paper>
        <Table
          height={'300px'}
          onRowSelection={(v) => this._selectRow(v, tableData)}
        >
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="5" tooltip="Super Header" style={{textAlign: 'center'}}>
                Please Select Room!
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The No">No</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The System">System</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Password">Password</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Visit">Visit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            showRowHover={true}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={this.state.selectedRoom !== undefined && this.state.selectedRoom.id === index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.system}</TableRowColumn>
                <TableRowColumn>{row.password ? 'O' : 'X'}</TableRowColumn>
                <TableRowColumn>{row.visit ? 'O' : 'X'}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
          >
            <TableRow>
              <TableRowColumn colSpan="5" style={{textAlign: 'center'}}>
                <TextField
                  floatingLabelText="User Name"
                  style={{ width: 150 }}
                  value={this.state.name}
                  onChange={(e, v) => this.setState({ name: v })}
                />
                <RaisedButton
                  label="Login"
                  disabled={this.state.selectedRoom === undefined}
                  onTouchTap={() => history.push(`/${this.state.selectedRoom.id}`)}
                />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="5" style={{textAlign: 'center'}}>
                Create & Delete
              </TableRowColumn>
            </TableRow>
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
};

export default RoomList;