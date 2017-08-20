import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * BCDiceAPIのシステム選択部品
 */
class SelectDiceSystem extends Component {
  render() {
    const { systems, system, selectSystem } = this.props;
    // 選択肢作成
    const items = systems.map(system => <MenuItem key={system} value={system} primaryText={system} />);
    return (
      <div>
        <SelectField
          floatingLabelText="Dice Bot"
          value={system.gameType}
          onChange={(e, i, v) => selectSystem(v)}
        >
          {items}
        </SelectField>
      </div>
    )
  }
}
SelectDiceSystem.protoType = {
  systems: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  selectSystem: PropTypes.func.isRequired,
};
export default SelectDiceSystem;