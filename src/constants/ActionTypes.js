/** アプリ内で利用する定数 */
const ActionTypes = {
  Character: {
    SET: 'Character.set',
    INIT: 'Character.init',
  },
  Characters: {
    SET: 'Characters.set',
    ADD: 'Characters.add',
    INIT: 'Map.init',
  },
  Layouts: {
    SET: 'Layouts.set',
    ADD: 'Layouts.add',
  },
  Map: {
    SET: 'Map.set',
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
    INIT: 'Map.init',
  },
  Systems: {
    SET: 'Systems.set',
  },
  System: {
    SET: 'System.set',
  },
  User: {
    id: {
      SET: 'User.id.set',
    },
    name: {
      SET: 'User.name.set',
    },
  },
  Rooms: {
    ADD: 'Rooms.add',
  },
};

export default ActionTypes;
