import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { UserHandler } from './store/reducer/auth';
import ReduxThunk from 'redux-thunk'
import JobHandler from './store/reducer/job';
const reducer = combineReducers({
  auth: UserHandler,
  job: JobHandler
})

const store = createStore(reducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
