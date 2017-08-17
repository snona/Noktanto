import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Colors from 'material-ui/styles/colors';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DiceBotArea extends Component {
  render() {
    const { systems, system, selectSystem } = this.props;
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
DiceBotArea.protoType = {
  systems: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  selectSystem: PropTypes.func.isRequired,
};
export default DiceBotArea;