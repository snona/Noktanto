/** アプリ内で利用する定数 */
const ActionTypes = {
  Character: {
    SET: 'Character.set',
    INIT: 'Character.init',
  },
  Characters: {
    SET: 'Characters.set',
    ADD: 'Characters.add',
  },
  Layouts: {
    SET: 'Layouts.set',
    ADD: 'Layouts.add',
  },
  Map: {
    SET: 'Map.set',
  },
  Messages: {
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
  },
  Systems: {
    SET: 'Systems.set',
  },
  System: {
    SET: 'System.set',
  },
  Authentication: {
    SET: 'Authentication.set',
  },
};

export default ActionTypes;
