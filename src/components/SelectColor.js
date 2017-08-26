import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as Colors from 'material-ui/styles/colors';

/**
 * 色選択部品
 */
class SelectColor extends Component {
  /** 選択可能色 */
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
    value: Colors.brown400,
  }, {
    name: 'Grey',
    value: Colors.grey400,
  }, {
    name: 'Blue Grey',
    value: Colors.blueGrey400,
  }];

  shouldComponentUpdate(nextProps, nextState) {
    // 選択中色が更新されていない場合は画面を再描画しない
    const { selectedColor } = this.props;
    if (selectedColor === nextProps.selectedColor) {
      return false;
    }
    return true;
  }

  _selectColor = (e, i, value) => {
    const { selectColor } = this.props;
    selectColor(value);
  };

  _createItems = () => {
    return SelectColor.colors.map(color => (
      <MenuItem
        key={color.value}
        value={color.value}
        primaryText={color.name}
        style={{ color: color.value }}
      />
    ));
  };

  render() {
    const { selectedColor } = this.props;
    // 選択肢作成
    const items = this._createItems();
    return (
      <div>
        <SelectField
          floatingLabelText="Select Color"
          value={selectedColor}
          onChange={this.selectColor}
          labelStyle={{ color: selectedColor }}
          selectedMenuItemStyle={{ color: selectedColor }}
        >
          {items}
        </SelectField>
      </div>
    )
  }
}
SelectColor.protoType = {
  selectedColor: PropTypes.string.isRequired,
  selectColor: PropTypes.func.isRequired,
};
export default SelectColor;