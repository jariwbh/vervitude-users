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
				left: { fontSize: 16, color: '#000000' },
				right: { fontSize: 16, color: '#FFFFFF' }
			}}
			wrapperStyle={{
				left: {
					elevation: 0,
					marginTop: 0.5,
					paddingVertical: 3,
					backgroundColor: '#EEEEEE'

				},
				right: {
					elevation: 0,
					marginTop: 0.5,
					paddingVertical: 3,
					backgroundColor: '#FFB629'
				}
			}}
		/>
	);
};

export { renderBubble };
