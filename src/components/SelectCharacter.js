import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * 発言者選択部品
 */
class SelectCharacter extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 発言者一覧, 選択中発言者が更新されていない場合は画面を再描画しない
    const { characters, selectedCharacter } = this.props;
    if (Object.keys(characters).length === Object.keys(nextProps.characters).length) {
      if (selectedCharacter.id === nextProps.selectedCharacter.id) {
        return false;
      }
    }
    return true;
  }

  _selectCharacter = (e, i, value) => {
    const { selectCharacter } = this.props;
    selectCharacter(value);
  };

  _createItems = () => {
    const { characters } = this.props;
    return Object.keys(characters).map(key => {
      const character = characters[key];
      return (
        <MenuItem
          key={key}
          value={character.id}
          primaryText={character.name}
          style={{ color: character.color }}
        />
      );
    });
  };

  render() {
    const { selectedCharacter } = this.props;
    // 選択肢作成
    const items = this._createItems();
    return (
      <div>
        <SelectField
          floatingLabelText="Select Character"
          value={selectedCharacter.id}
          onChange={this._selectCharacter}
          labelStyle={{ color: selectedCharacter.color }}
          selectedMenuItemStyle={{ color: selectedCharacter.color }}
          style={{ marginRight: 10 }}
        >
          {items}
        </SelectField>
        {/* TODO: 表情の選択肢を追加 */}
      </div>
    )
  }
}
SelectCharacter.protoType = {
  characters: PropTypes.object.isRequired,
  selectedCharacter: PropTypes.object.isRequired,
  selectCharacter: PropTypes.func.isRequired,
};
export default SelectCharacter;