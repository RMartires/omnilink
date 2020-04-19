import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

class App extends Component {

  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);

  }

  state = {
    token: undefined,
    color: {
      dominant: '#FFDC80',
      accent1: '#FFDC80',//#FCAF45
      accent2: '#FCAF45'//#F77737
    }
  };

  componentDidMount() {
    if (!this.state.token) {
      var decodedtoken;
      var token = Cookies.get('jwttoken');
      try {
        decodedtoken = jwt.verify(token, 'heyphil123');
      } catch (err) {
        console.log(err);
      }
      if (decodedtoken) {
        console.log(decodedtoken);
        this.setState({
          token: decodedtoken
        });
      }
    }
  }

  setToken = (token) => {
    var decodedtoken;
    Cookies.set('jwttoken', token);
    try {
      decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      console.log(decodedtoken);
      this.setState({
        token: decodedtoken
      });
    }
  }

  render() {
    const home = () => {
      if (this.state.token) {
        return <Home token={this.state.token}
          color={this.state.color}
        />
      } else {
        return <Home color={this.state.color} />
      }
    };

    const login = () => {
      return <Login setToken={this.setToken}
        color={this.state.color}
      />
    }

    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={login} />
          <Route path='/:' component={home} />
        </Switch>
      </div>
    );
  }

}

export default App;
