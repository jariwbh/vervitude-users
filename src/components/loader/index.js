import React, { useContext } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 1,
    elevation: 2,
    height,
    width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  indicator: {
    backgroundColor: '#5AC8FA',
    height: 44,
    width: 44,
    borderRadius: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.indicator}>
        <ActivityIndicator
          size='large'
          color={'#FFFFFF'}
          style={{
            left: Platform.OS === 'ios' ? 1.3 : 0,
            top: Platform.OS === 'ios' ? 1 : 0,
          }}
        />
      </View>
    </View>
  );
};

export default Loader;
