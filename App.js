import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import NavigationApp from './src/navigations/navigations';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationApp />
    </SafeAreaView>
  );
};

export default App;
