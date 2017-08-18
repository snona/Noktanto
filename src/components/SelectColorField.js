import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as Colors from 'material-ui/styles/colors';

class SelectColorField extends Component {
  static colors = [{
    name: 'Red',
    value: Colors.redA200,
  }, {
    name: 'Pink',
    value: Colors.pinkA200,
  }, {
    name: 'Purple',
    value: Colors.purpleA200,
  }, {
    name: 'Deep Purple',
    value: Colors.deepPurpleA200,
  }, {
    name: 'Indigo',
    value: Colors.indigoA200,
  }, {
    name: 'Blue',
    value: Colors.blueA200,
  }, {
    name: 'Light Blue',
    value: Colors.lightBlueA200,
  }, {
    name: 'Cyan',
    value: Colors.cyanA200,
  }, {
    name: 'Teal',
    value: Colors.tealA200,
  }, {
    name: 'Green',
    value: Colors.greenA200,
  }, {
    name: 'Light Green',
    value: Colors.lightGreenA200,
  }, {
    name: 'Lime',
    value: Colors.limeA200,
  }, {
    name: 'Yellow',
    value: Colors.yellowA200,
  }, {
    name: 'Amber',
    value: Colors.amberA200,
  }, {
    name: 'Orange',
    value: Colors.orangeA200,
  }, {
    name: 'Deep Orange',
    value: Colors.deepOrangeA200,
  }, {
    name: 'Brown',
    value: Colors.brownA200,
  }, {
    name: 'Grey',
    value: Colors.greyA200,
  }, {
    name: 'Blue Grey',
    value: Colors.blueGreyA200,
  }];
  render() {
    const { selectedColor, selectColor } = this.props;
    const items = SelectColorField.colors.map(color => (
      <MenuItem
        key={color.value}
        value={color.value}
        primaryText={color.name}
        style={{ color: color.value }}
      />
    ));
    return (
      <div>
        <SelectField
          floatingLabelText="Select Color"
          value={selectedColor}
          onChange={(e, i, v) => selectColor(v)}
          labelStyle={{ color: selectedColor }}
          selectedMenuItemStyle={{ color: selectedColor }}
        >
          {items}
        </SelectField>
      </div>
    )
  }
}
SelectColorField.protoType = {
  selectedColor: PropTypes.string.isRequired,
  selectColor: PropTypes.func.isRequired,
};
export default SelectColorField;