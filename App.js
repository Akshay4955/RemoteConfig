import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';

const App = () => {
  const [name, setName] = useState('Subscribe to my app');

  useEffect(() => {
    remoteConfig()
      .setDefaults({
        is_subscribed: false,
      })
      .then(() => remoteConfig().fetchAndActivate(10))
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.');
          const isSubscribed = remoteConfig().getValue('is_subscribed');
          if (isSubscribed) {
            setName('Already subscribed');
          }
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
