import React from 'react';
import { Time } from 'react-native-gifted-chat';

const renderTime = (props) => (
	<Time
		{...props}
		timeTextStyle={{
			right: { color: '#FFFFFF', fontSize: 12 },
			left: { color: '#000000', fontSize: 12 }
		}}
	/>
);

export { renderTime };
