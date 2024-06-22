import {createStore} from 'redux';
import news from './reducer';

const store=createStore(news);

export default store;