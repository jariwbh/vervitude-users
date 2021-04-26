import React from 'react';
import NavigationApp from './src/navigations/navigations';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationApp />
    </SafeAreaProvider>
  );
};

export default App;