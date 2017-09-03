import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

/**
 * チャットのログ部品
 */
class ChatLog extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { messages, layout } = this.props;
    // メッセージ件数, レイアウトが未変更の場合は画面を更新しない
    if (messages.length === nextProps.messages.length) {
      if (layout.w === nextProps.layout.w && layout.h === nextProps.layout.h) {
        return false;
      }
    }
    return true;
  }

  _createAvatar(character) {
    if (character.url === '') {
      return (
        <Avatar
          color={character.color}
          backgroundColor={'#F5F5F5'}
          size={32}
          style={{ top: 8 }}
        >
          {character.name !== '' ? character.name[0] : '?'}
        </Avatar>
      );
    }

    return (
      <Avatar
        src={character.url}
        size={32}
        style={{ top: 8 }}
      />
    );
  }

  _cretePrimaryText = (color, name, userName) => {
    return (
      <div style={{ color: color, fontSize: 10 }} >
        {name} ({userName})
      </div>
    );
  };

  _creteSecondaryText = (color, text) => {
    return (
      <div style={{ color: color, fontSize: 14 }} >
        {text}
      </div>
    );
  };

  _createLog = (key, avatar, primaryText, secondaryText) => {
    return (
      <ListItem
        key={key}
        leftAvatar={avatar}
        primaryText={primaryText}
        secondaryText={secondaryText}
        innerDivStyle={{ paddingTop: 5, paddingLeft: 60, paddingRight: 0, paddingBottom: 5 }}
      />
    );
  }

  _createLogs = () => {
    const { messages, secretMessages } = this.props;
    const logs = [];
    messages.forEach(message => {
      const character = message.character;
      // 発言者画像
      const avatar = this._createAvatar(character);
      // 発言者名
      const primaryText = this._cretePrimaryText(character.color, character.name, message.userName);
      // 発言内容
      const secondaryText = this._creteSecondaryText(character.color, message.text);
      const log = this._createLog(`key-${message.id}`, avatar, primaryText, secondaryText);
      logs.push(log);
      if (message.secret !== undefined) {
        const secretMessage = secretMessages[message.secret];
        console.log(secretMessage);
        const messageSecondaryText = this._creteSecondaryText(character.color, secretMessage.message);
        const messageLog = this._createLog(`log-${message.secret}-message`, avatar, primaryText, messageSecondaryText);
        const resultSecondaryText = this._creteSecondaryText(character.color, secretMessage.result);
        const resultLog = this._createLog(`log-${message.secret}-result`, avatar, primaryText, resultSecondaryText);
        logs.push(messageLog);
        logs.push(resultLog);
      }
    });
    logs.reverse(); // 上に新規メッセージが欲しいので逆順にソート
    return logs;
  };

  render() {
    const { layout } = this.props;
    // ログ一覧を作成
    const logs = this._createLogs();
    return (
      <Paper style={{ overflow: 'scroll', height: layout.h - 260 }} >
        <List>
          {logs}
        </List>
      </Paper>
    )
  }
}
ChatLog.protoType = {
  messages: PropTypes.array.isRequired,
  secretMessages: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
};
export default ChatLog;