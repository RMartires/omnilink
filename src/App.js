import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import login from './pages/login'

class App extends Component {

  state = {

  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={login} />
        </Switch>
      </div>
    );
  }

}

export default App;
