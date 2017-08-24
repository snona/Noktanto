/** アプリ内で利用する定数 */
const ActionTypes = {
  Character: {
    SET: 'Character.set',
    INIT: 'Character.init',
  },
  Characters: {
    SET: 'Characters.set',
    ADD: 'Characters.add',
    REMOVE: 'Characters.remove',
    INIT: 'Characters.init',
  },
  Layouts: {
    SET: 'Layouts.set',
    ADD: 'Layouts.add',
  },
  Map: {
    SET: 'Map.set',
    INIT: 'Map.init',
  },
  Messages: {
    INIT: 'Messages.init',
    SET: 'Messages.set',
    ADD: 'Messages.add',
  },
  Piece: {
    SET: 'Piece.set',
    INIT: 'Piece.init',
  },
  Pieces: {
    SET: 'Pieces.set',
    ADD: 'Pieces.add',
    REMOVE: 'Pieces.remove',
    INIT: 'Pieces.init',
  },
  Systems: {
    SET: 'Systems.set',
  },
  System: {
    gameType: {
      SET: 'System.gameType.set',
    },
    SET: 'System.set',
  },
  User: {
    RECEIVE: 'User.receive',
    id: {
      SET: 'User.id.set',
    },
  },
  Rooms: {
    ADD: 'Rooms.add',
    REMOVE: 'Rooms.remove',
    INIT: 'Rooms.init',
  },
  Room: {
    SET: 'Room.set',
    RECEIVE: 'Room.receive',
  }
};

export default ActionTypes;
