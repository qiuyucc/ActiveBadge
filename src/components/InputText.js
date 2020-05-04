import PropTypes from "prop-types";
import React, {Component} from "react";
import { View, StyleSheet, Text } from 'react-native';
import {TextInput} from 'react-native-paper';
import { theme } from '../core/theme';

const propTypes = {
  mapElement: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string
};

const defaultProps = {
  mapElement: (n) => {},
  onSubmitEditing: () => {},
  onChangeText: () => {},
  value: "",
  placeholder: "",
  maxLength: 200,
  keyboardType: "default",
  secureTextEntry: false,
  label: ""
};
class InputText extends Component<> {

  state = {
    value: ""
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  onChangeText = (value) => {
    this.setState({
      value
    }, () => {
      this.props.onChangeText(value);
    })
  }

  render() {
    const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing} = this.props;
    return (
        <View style={styles.container}>
          <TextInput
              style={styles.input}
              underlineColor="transparent"
              placeholder={placeholder}
              placeholderTextColor="rgba(255,255,255,0.8)"
              selectionColor={theme.colors.primary}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              maxLength={maxLength}
              returnKeyType="next"
              value={this.state.value}
              onSubmitEditing={onSubmitEditing}
              onChangeText={this.onChangeText}
              mode="outlined"/>

        </View>
    );
  }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;



const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    width:300
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default InputText;