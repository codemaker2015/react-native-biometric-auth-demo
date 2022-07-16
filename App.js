import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: "Verify that it's you", // Android
  imageColor: '#22CBA5', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch the fingerprint sensor', // Android
  sensorErrorDescription: 'Failed to authenticate', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

export default function App() {
  const authenticate = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        TouchID.authenticate('Use your fingerprint to continue', optionalConfigObject)
        .then(success => {
          Alert.alert(
            "Authentication",
            "Authenticated Successfully",
            [ { text: "OK" } ],
          );
          console.log('Authenticated Successfully')
        })
        .catch(error => {
          Alert.alert(
            "Authentication",
            "Failed to authenticate.\n" + error?.details,
            [ { text: "OK" } ],
          );
          console.log(error?.details)
        })
      })
      .catch(error => {
        Alert.alert(
          "Authentication",
          "Failed to authenticate.\n" + error?.details,
          [ { text: "OK" } ],
        );
        console.log(error?.details)
      });
  } 

  return (
    <View style={styles.container}>
      <Button onPress={authenticate} title="Authenticate" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
