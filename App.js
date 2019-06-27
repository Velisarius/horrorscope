import * as Permissions from 'expo-permissions'
import { Notifications, AppLoading } from 'expo';
import React, { useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';

const PUSH_ENDPOINT = 'https://horrorscope.firebaseapp.com/send_notification';

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
        <AppLoading
            startAsync={registerForPushNotificationsAsync()}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
    );
  } else {
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

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
