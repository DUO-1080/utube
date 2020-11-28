import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userdetailReduce from './reducers/userdetailSlice';
import sidebarReduce from './reducers/sidebarSlice';
import feedReduce, { getFeed } from './reducers/feedSlice';
import subscriptionReduce from './reducers/subscriptions';
import trendingReduce from './reducers/trendingSlice';
import channelReduce from './reducers/channelSlice';
import gridReduce from './reducers/gridSlice';
import historyReduce from './reducers/historySlice';
import likedVideoReduce from './reducers/likedVideoSlice';
import menuReduce from './reducers/menuSlice';

export default configureStore({
  reducer: {
    userdetail: userdetailReduce,
    sidebar: sidebarReduce,
    feed: feedReduce,
    subscription: subscriptionReduce,
    channel: channelReduce,
    trending: trendingReduce,
    grid: gridReduce,
    history: historyReduce,
    liked: likedVideoReduce,
    menu: menuReduce,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
