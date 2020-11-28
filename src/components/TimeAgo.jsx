import React from 'react';
import ReactTimeAgo from 'react-time-ago';

const TimeAgo = ({ seconds }) => <ReactTimeAgo date={new Date(seconds * 1000)} />;

export default TimeAgo;
