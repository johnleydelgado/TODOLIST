import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TaskListView } from './views/index';

import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={TaskListView} />
      </Switch>
    </Router>
  );
}
