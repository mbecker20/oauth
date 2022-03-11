import type { Component } from 'solid-js';
import styles from './App.module.css';
import { loginGithub } from './query';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <button onClick={loginGithub}>login with github</button>
    </div>
  );
};

export default App;
