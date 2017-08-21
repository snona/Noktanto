import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * ルーム一覧表示部品
 */
class RoomLogin extends Component {
  componentWillMount() {
    this.setState({
      name: '',
      password: '',
      open: false,
      errorText: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { name } = this.props;
    if (name === '' && nextProps.name !== '') {
      this.setState({ name: nextProps.name });
    }
  }

  _loginRoom() {
    const { name } = this.state;
    const { room, user, history, loginRoom } = this.props;
    loginRoom(room, user, name, history);
  }

  _closePasswordDialog() {
    this.setState({ open: false });
  }

  _checkPassword(password) {
    const { room, checkRoomPassword } = this.props;
    return Promise.resolve(checkRoomPassword(room, password).then(result => {
      console.log(result);
      if (!result) {
        this.setState({ errorText: 'Password wrong.' });
      }
      return result;
    }));
  }

  _createPasswordDialog(room) {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this._closePasswordDialog()}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={() => {
          this._checkPassword(this.state.password).then(result => {
            if(result) {
              this._closePasswordDialog(); 
              this._loginRoom();
            }
          });
        }}
      />,
    ];
    return (
      <Dialog
        title={room !== undefined ? room.name : ''}
        actions={actions}
        modal={false}
        contentStyle={{ width: 500 }}
        open={this.state.open}
        onRequestClose={() => this._closePasswordDialog()}
      >
        <TextField
          floatingLabelText="Password"
          style={{ width: 150 }}
          type="password"
          value={this.state.password}
          onChange={(e, v) => this.setState({ password: v })}
          errorText={this.state.errorText}
        />
      </Dialog>
    );
  }

  _openPasswordDialog() {
    this.setState({ open: true, password: '', errorText: '' });
  }

  render() {
    const { name } = this.state;
    const { room, user, createRoom, deleteRoom, history } = this.props;
    // const sampleRoom = {
    //   name: 'Sample Room with Password',
    //   users: {
    //     [user.id]: true,
    //   },
    //   authentication: true,
    //   visit: false,
    //   system: 'Cthulhu',
    // };
    const sampleRoom = {
      name: 'Sample Room with Password',
      users: {
        [user.id]: true,
      },
      authentication: false,
      visit: false,
      system: 'Cthulhu',
    };
    const passwordDialog = this._createPasswordDialog(room);
    return (
      <div>
        <TextField
          floatingLabelText="User Name"
          style={{ width: 150, marginRight: 100 }}
          value={this.state.name}
          onChange={(e, v) => this.setState({ name: v })}
        />
        <RaisedButton
          label="Login"
          disabled={room === undefined}
          onTouchTap={() => room.authentication ? this._openPasswordDialog() : this._loginRoom()}
          style={{ marginRight: 100 }}
        />
        {passwordDialog}
        <RaisedButton
          label="Create"
          secondary={true}
          onTouchTap={() => createRoom(sampleRoom, user, name, history, 'password')}
          style={{ marginRight: 100, marginTop: 10, marginBottom: 10 }}
        />
        <RaisedButton
          label="Delete"
          primary={true}
          disabled={room === undefined}
          onTouchTap={() => deleteRoom(this.props.room)}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
      </div>
    );
  }
}

RoomLogin.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    authentication: PropTypes.string,
  }),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  loginRoom: PropTypes.func.isRequired,
  checkRoomPassword: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
};

export default RoomLogin;