/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './components/App/App';
import Client from './util/client';

export const URL = "http://localhost:2020";
export const client = new Client(URL);

render(() => <App />, document.getElementById('root') as HTMLElement);
