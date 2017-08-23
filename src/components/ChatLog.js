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

  render() {
    const { messages, layout } = this.props;
    // ログ一覧を作成
    const logs = messages.map(message => {
      // 発言者画像
      const avatar = this._createAvatar(message.character);
      // 発言者名
      const primaryText = (
        <div style={{ color: message.character.color, fontSize: 10 }} >
          {message.character.name} ({message.character.name})
        </div>
      );
      // 発言内容
      const secondaryText = (
        <div style={{ color: message.character.color, fontSize: 14 }} >
          {message.text}
        </div>
      );
      return (
        <ListItem
          key={`log-${message.id}`}
          leftAvatar={avatar}
          primaryText={primaryText}
          secondaryText={secondaryText}
          innerDivStyle={{ paddingTop: 5, paddingLeft: 60, paddingRight: 0, paddingBottom: 5 }}
        />
      );
    }).reverse(); // 上に新規メッセージが欲しいので逆順にソート
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
  layout: PropTypes.object.isRequired,
};
export default ChatLog;