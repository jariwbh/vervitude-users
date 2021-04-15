import React from 'react';
import { Time } from 'react-native-gifted-chat';

const renderTime = (props) => (
	<Time
		{...props}
		timeTextStyle={{
			right: { color: '#f5f5f5', fontSize: 12 },
			left: { color: '#f5f5f5', fontSize: 12 }
		}}
	/>
);

export { renderTime };
