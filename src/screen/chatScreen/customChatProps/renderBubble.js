import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
import { renderTime } from './renderTime';

const renderBubble = (props, navigation) => {
	return (
		<Bubble
			{...props}
			renderTime={renderTime}
			renderTicks={() => null}
			renderMessageImage={() => null}
			textStyle={{
				left: { fontSize: 16, color: '#fff' },
				right: { fontSize: 16, color: '#fff' }
			}}
			wrapperStyle={{
				left: {
					elevation: 0,
					marginTop: 0.5,
					paddingVertical: 3,
					backgroundColor: '#F1C40E'
				},
				right: {
					elevation: 0,
					marginTop: 0.5,
					paddingVertical: 3,
					backgroundColor: '#0077ff'
				}
			}}
		/>
	);
};

export { renderBubble };
