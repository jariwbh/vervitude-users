import React from 'react';

import { SafeAreaView, StatusBar } from 'react-native';

import styles from './GeneralStatusBarColorStyles';

const GeneralStatusBarColor = ({ translucent, hidden, backgroundColor, ...props }) => (
    <SafeAreaView style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent={translucent} hidden={hidden} backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
);

export default GeneralStatusBarColor;