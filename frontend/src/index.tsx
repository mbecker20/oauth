/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { readJWTFromUrlParams } from './helpers';

export const URL = "http://localhost:2020";

console.log(readJWTFromUrlParams());

render(() => <App />, document.getElementById('root') as HTMLElement);
