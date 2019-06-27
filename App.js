import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={onButtonPress}
      >
        <Text style={styles.buttonText}>Read The Stars</Text>
      </TouchableOpacity>
    </View>
  );
}

function onButtonPress() {
  Alert.alert('You tapped the button!')
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    width: 250,
    height: 250,
    borderRadius: 500,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white'
  }
});
