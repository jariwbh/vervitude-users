import React from 'react';
import { Day } from 'react-native-gifted-chat';

const renderDay = (props) => (
	<Day
		{...props}
		textStyle={{
			backgroundColor: '#111',
			color: '#fff',
			borderRadius: 4,
			paddingHorizontal: 10,
			paddingVertical: 4,
			elevation: 1,
			fontSize: 12
		}}
		dateFormat={{
			sameDay: '[Today]',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: 'DD MMM YYYY'
		}}
	/>
);

export { renderDay };
