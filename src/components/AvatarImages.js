import React, {memo, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';


export default class AvatarImages extends React.Component {
  render() {



    return (
        <TouchableOpacity >
        <Image source={this.props.imageSource}
               style={styles.image}/>
            </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

