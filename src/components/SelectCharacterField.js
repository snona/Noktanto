import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SelectCharacterField extends Component {
  render() {
    const { characters, selectedCharacter, selectCharacter } = this.props;
    const items = Object.keys(characters).map(key => {
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
    return (
      <div>
        <SelectField
          floatingLabelText="Select Character"
          value={selectedCharacter.id}
          onChange={(e, i, v) => selectCharacter(v)}
          labelStyle={{ color: selectedCharacter.color }}
          selectedMenuItemStyle={{ color: selectedCharacter.color }}
        >
          {items}
        </SelectField>
      </div>
    )
  }
}
SelectCharacterField.protoType = {
  characters: PropTypes.object.isRequired,
  selectedCharacter: PropTypes.object.isRequired,
  selectCharacter: PropTypes.func.isRequired,
};
export default SelectCharacterField;