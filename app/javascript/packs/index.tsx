// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from '../components/App'
import 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import tasksReducer from '../reducers/tasksReducer';
import tagsReducer from '../reducers/tagsReducer';
import taskReducer from '../reducers/taskReducer';
import tagListReducer from '../reducers/tagListReducer';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    tags: tagsReducer,
    task: taskReducer,
    tagList: tagListReducer
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;